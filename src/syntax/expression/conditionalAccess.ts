import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, nameNodeTypes, SyntaxNode } from '../syntaxNode';
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

export const conditionalAccessExpressionPrinter: Printer<ConditionalAccessExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  const { expression } = path.getValue();

  // @ts-ignore
  const shouldStartNewLine = !nameNodeTypes.includes(expression.nodeType);

  return indent(
    concat([
      dedent(path.call(print, 'expression')),
      shouldStartNewLine ? softline : '',
      path.call(print, 'operatorToken'),
      dedent(path.call(print, 'whenNotNull')),
    ])
  );
};
