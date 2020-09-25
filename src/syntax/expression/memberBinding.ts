import { SyntaxToken } from '../syntaxToken';
import { NameNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type MemberBindingExpressionNode = {
  name: NameNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const memberBindingExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { operatorToken }: MemberBindingExpressionNode = path.getValue();

  return concat([operatorToken.text, path.call(print, 'name')]);
};
