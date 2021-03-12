import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import indent = doc.builders.indent;
import line = doc.builders.line;
import { builders } from 'prettier/doc';
import dedent = builders.dedent;

export type BinaryExpressionNode = {
  left: ExpressionNode;
  operatorToken: SyntaxToken;
  right: ExpressionNode;
} & SyntaxNode;

export const binaryExpressionPrinter: Printer<BinaryExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'left'),
    indent(
      concat([
        line,
        path.call(print, 'operatorToken'),
        ' ',
        dedent(path.call(print, 'right')),
      ])
    ),
  ]);
