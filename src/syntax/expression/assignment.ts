import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type AssignmentExpressionNode = {
  left: ExpressionNode;
  operatorToken: SyntaxToken;
  right: ExpressionNode;
} & SyntaxNode;

export const assignmentExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { operatorToken }: AssignmentExpressionNode = path.getValue();

  return concat([
    path.call(print, 'left'),
    ' ',
    operatorToken.text,
    ' ',
    path.call(print, 'right'),
  ]);
};
