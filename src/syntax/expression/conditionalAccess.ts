import { SyntaxToken } from '../syntaxToken';
import {
  ExpressionNode,
  nameNodeTypes,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import dedent = doc.builders.dedent;

export type ConditionalAccessExpressionNode = {
  expression: ExpressionNode;
  operatorToken: SyntaxToken;
  whenNotNull: ExpressionNode;
} & SyntaxNode;

export const conditionalAccessExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    operatorToken,
    expression,
  }: ConditionalAccessExpressionNode = path.getValue();

  // @ts-ignore
  const shouldStartNewLine = !nameNodeTypes.includes(expression.nodeType);

  return indent(
    concat([
      dedent(path.call(print, 'expression')),
      shouldStartNewLine ? softline : '',
      operatorToken.text,
      dedent(path.call(print, 'whenNotNull')),
    ])
  );
};
