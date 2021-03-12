import { SyntaxToken } from '../syntaxToken';
import { InitializerExpressionNode } from './initializer';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode, TypeNode } from '../syntaxNode';

export type ImplicitStackAllocArrayCreationExpressionNode = {
  stackAllocKeyword: SyntaxToken;
  openBracketToken: SyntaxToken;
  closeBracketToken: SyntaxToken;
  initializer: InitializerExpressionNode;
} & SyntaxNode;

export const implicitStackAllocArrayCreationExpressionPrinter: Printer<ImplicitStackAllocArrayCreationExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  var a = path.getValue();

  return concat([
    path.call(print, 'stackAllocKeyword'),
    path.call(print, 'openBracketToken'),
    path.call(print, 'closeBracketToken'),
    path.call(print, 'initializer'),
  ]);
};

export type StackAllocArrayCreationExpressionNode = {
  stackAllocKeyword: SyntaxToken;
  type: TypeNode;
  initializer: InitializerExpressionNode;
} & SyntaxNode;

export const stackAllocArrayCreationExpressionPrinter: Printer<StackAllocArrayCreationExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'stackAllocKeyword'),
    ' ',
    path.call(print, 'type'),
    path.call(print, 'initializer'),
  ]);
