import { doc } from 'prettier';
import hardline = doc.builders.hardline;
import Doc = doc.builders.Doc;

export type SyntaxTrivia = {
  nodeType: SyntaxTriviaType;
  text: string;
};

export type SyntaxTriviaType =
  | 'SingleLineCommentTrivia'
  | 'MultiLineCommentTrivia'
  | 'EndOfLineTrivia'; // todo add doc comments

type SyntaxTriviaPrinter = (node: SyntaxTrivia) => Doc;

const commentTriviaPrinter: SyntaxTriviaPrinter = (node) => node.text;

const endOfLineTriviaPrinter: SyntaxTriviaPrinter = () => hardline;

const triviaPrintersByType: {
  [key in SyntaxTriviaType]: SyntaxTriviaPrinter;
} = {
  SingleLineCommentTrivia: commentTriviaPrinter,
  MultiLineCommentTrivia: commentTriviaPrinter,
  EndOfLineTrivia: endOfLineTriviaPrinter,
};

export const printTrivia: SyntaxTriviaPrinter = (node: SyntaxTrivia) =>
  triviaPrintersByType[node.nodeType](node);

export const printCommentOnlyTrivia = (nodes: Array<SyntaxTrivia>) =>
  nodes
    .filter((node) =>
      ['SingleLineCommentTrivia', 'MultiLineCommentTrivia'].includes(
        node.nodeType
      )
    )
    .map(printTrivia);
