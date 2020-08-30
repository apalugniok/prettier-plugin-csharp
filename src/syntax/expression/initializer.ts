import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import indent = doc.builders.indent;
import ifBreak = doc.builders.ifBreak;
import line = doc.builders.line;
import concat = doc.builders.concat;
import join = doc.builders.join;
import group = doc.builders.group;

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

  return expressions.length !== 0
    ? group(
        concat([
          line,
          '{',
          indent(
            concat([
              line,
              join(concat([',', line]), path.map(print, 'expressions')),
            ])
          ),
          ifBreak(',', ''),
          line,
          '}',
        ])
      )
    : ' {}';
};
