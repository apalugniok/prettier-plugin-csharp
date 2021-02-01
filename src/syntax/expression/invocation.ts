import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { ArgumentListNode } from './argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type InvocationExpressionNode = {
  expression: ExpressionNode;
  argumentList: ArgumentListNode;
} & SyntaxNode;

export const invocationExpressionPrinter: Printer<InvocationExpressionNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'expression'), path.call(print, 'argumentList')]);
