import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type AssignmentExpressionNode = {
  left: ExpressionNode;
  operatorToken: SyntaxToken;
  right: ExpressionNode;
} & SyntaxNode;

export const assignmentExpressionPrinter: Printer<AssignmentExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'left'),
    ' ',
    path.call(print, 'operatorToken'),
    ' ',
    path.call(print, 'right'),
  ]);
