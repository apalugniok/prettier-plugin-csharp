import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { ArgumentListNode } from './argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import indent = doc.builders.indent;
import group = doc.builders.group;

export type InvocationExpressionNode = {
  expression: ExpressionNode;
  argumentList: ArgumentListNode;
} & SyntaxNode;

export const invocationExpressionPrinter: Printer<InvocationExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  // When invoking on a member access we want to indent the arguments to the same level
  // as the member access expression
  const isInvocationOnMemberAccessExpression =
    path.getValue().expression.nodeType === 'MemberAccessExpression';

  const expression = concat([
    path.call(print, 'expression'),
    group(path.call(print, 'argumentList')),
  ]);
  return isInvocationOnMemberAccessExpression ? indent(expression) : expression;
};
