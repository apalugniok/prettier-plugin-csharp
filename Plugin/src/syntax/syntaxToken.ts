import { CommentTriviaType, isComment, SyntaxTrivia } from './syntaxTrivia';
import { doc, Doc, Printer } from 'prettier';
import lineSuffix = doc.builders.lineSuffix;
import concat = doc.builders.concat;
import hardline = doc.builders.hardline;
import ifBreak = doc.builders.ifBreak;

export type SyntaxToken = {
  nodeType: 'Token';
  text: string;
  kind: string;
  leadingTrivia: Array<SyntaxTrivia>;
  trailingTrivia: Array<SyntaxTrivia>;
};

export const tokenPrinter: Printer['print'] = (path, _, print) => {
  const token: SyntaxToken = path.getValue();
  const { leadingTrivia, trailingTrivia } = token;
  let text: Doc = token.text;

  if (token.kind === 'InterpolatedVerbatimStringStartToken' && text === '@$"') {
    text = '$@"';
  }

  if (token.kind === 'InterpolatedStringStartToken') {
    text = ifBreak('$@"', text);
  }

  return concat([
    printComments(leadingTrivia, 'leading'),
    text,
    printComments(trailingTrivia, 'trailing'),
  ]);
};

const formatSingleLineComment = (trivia: SyntaxTrivia) =>
  `// ${trivia.text.trim().slice(2).trim()}`;

const formatMultiLineComment = (trivia: SyntaxTrivia) =>
  `/* ${trivia.text
    .trim()
    .slice(2, trivia.text.length - 2)
    .trim()} */`;

const formatSingleLineDocumentationComment = (trivia: SyntaxTrivia) =>
  `/// ${trivia.text.trim().slice(3).trim()}`;

const formatMultiLineDocumentationComment = (trivia: SyntaxTrivia) =>
  `/** ${trivia.text
    .trim()
    .slice(3, trivia.text.length - 3)
    .trim()} **/`;

type CommentPrinter = {
  leading: (trivia: SyntaxTrivia) => Doc;
  trailing: (trivia: SyntaxTrivia) => Doc;
};

const commentPrintersByCommentTriviaType: {
  [key in CommentTriviaType]: CommentPrinter;
} = {
  SingleLineComment: {
    leading: (comment) => concat([formatSingleLineComment(comment), hardline]),
    trailing: (comment) =>
      concat([' ', lineSuffix(formatSingleLineComment(comment))]),
  },
  MultiLineComment: {
    leading: (comment) => `${formatMultiLineComment(comment)} `,
    trailing: (comment) => ` ${formatMultiLineComment(comment)}`,
  },
  SingleLineDocumentationComment: {
    leading: (comment) =>
      concat([formatSingleLineDocumentationComment(comment), hardline]),
    trailing: (comment) =>
      concat([' ', lineSuffix(formatSingleLineDocumentationComment(comment))]),
  },
  MultiLineDocumentationComment: {
    leading: (comment) => `${formatMultiLineDocumentationComment(comment)} `,
    trailing: (comment) => ` ${formatMultiLineDocumentationComment(comment)}`,
  },
};

const printComments = (
  leadingTrivia: Array<SyntaxTrivia>,
  location: 'leading' | 'trailing'
): Doc =>
  concat(
    leadingTrivia.map((trivia) => {
      if (isComment(trivia)) {
        return commentPrintersByCommentTriviaType[trivia.triviaType][location](
          trivia
        );
      }

      return '';
    })
  );
