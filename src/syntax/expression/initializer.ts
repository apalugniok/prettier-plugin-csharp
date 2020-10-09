import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, FastPath, Printer } from 'prettier';
import indent = doc.builders.indent;
import ifBreak = doc.builders.ifBreak;
import line = doc.builders.line;
import concat = doc.builders.concat;
import join = doc.builders.join;
import group = doc.builders.group;
import softline = doc.builders.softline;

export type InitializerExpressionNode = {
  openBraceToken: SyntaxToken;
  closeBraceToken: SyntaxToken;
  expressions: Array<ExpressionNode>;
} & SyntaxNode;

export const initializerExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { expressions }: InitializerExpressionNode = path.getValue();

  const shouldAddSpaceAfterOpenBrace =
    expressions.length !== 0 &&
    expressions[0].nodeType !== 'InitializerExpression';

  const shouldAddSpaceBeforeCloseBrace =
    expressions.length !== 0 &&
    expressions[expressions.length - 1].nodeType !== 'InitializerExpression';

  const shouldAddLeadingWhitespace =
    (path.getParentNode() as SyntaxNode | null)?.nodeType !==
    'InitializerExpression';

  return expressions.length !== 0
    ? group(
        concat([
          shouldAddLeadingWhitespace ? line : softline,
          '{',
          indent(
            concat([
              shouldAddSpaceAfterOpenBrace ? line : softline,
              join(concat([',', line]), path.map(print, 'expressions')),
            ])
          ),
          ifBreak(',', ''),
          shouldAddSpaceBeforeCloseBrace ? line : softline,
          '}',
        ])
      )
    : ' {}';
};
