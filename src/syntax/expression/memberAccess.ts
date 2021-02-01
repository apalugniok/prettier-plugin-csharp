import { SyntaxToken } from '../syntaxToken';
import {
  ExpressionNode,
  NameNode,
  nameNodeTypes,
  SyntaxNode,
} from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import dedent = doc.builders.dedent;

export type MemberAccessExpressionNode = {
  expression: ExpressionNode;
  name: NameNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const memberAccessExpressionPrinter: Printer<MemberAccessExpressionNode>['print'] = (
  path,
  options,
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
      path.call(print, 'name'),
    ])
  );
};
