import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { ArgumentListNode } from './argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;

export type InvocationExpressionNode = {
  expression: ExpressionNode;
  argumentList: ArgumentListNode;
} & SyntaxNode;

export const invocationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'expression'),
    path.call(print, 'argumentList'),
  ]);
};
