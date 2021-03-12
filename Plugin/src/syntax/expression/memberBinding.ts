import { SyntaxToken } from '../syntaxToken';
import { NameNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type MemberBindingExpressionNode = {
  name: NameNode;
  operatorToken: SyntaxToken;
} & SyntaxNode;

export const memberBindingExpressionPrinter: Printer<MemberBindingExpressionNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'operatorToken'), path.call(print, 'name')]);
