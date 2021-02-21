import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, NameNode, SyntaxNode } from '../syntaxNode';
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
  // When a member access if followed by an invocation the indentation is added in the invocation expression printer
  const isInvokedMemberAccess =
    path.getParentNode()?.nodeType === 'InvocationExpression';

  const unIndentedFormat = concat([
    dedent(path.call(print, 'expression')),
    softline,
    path.call(print, 'operatorToken'),
    path.call(print, 'name'),
  ]);

  return isInvokedMemberAccess ? unIndentedFormat : indent(unIndentedFormat);
};
