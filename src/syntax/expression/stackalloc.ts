import { SyntaxToken } from '../syntaxToken';
import { InitializerExpressionNode } from './initializer';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode, TypeNode } from '../syntaxNode';

export type ImplicitStackAllocArrayCreationExpressionNode = {
  stackAllocKeyword: SyntaxToken;
  openBracketKeyword: SyntaxToken;
  closeBracketKeyword: SyntaxToken;
  initializer: InitializerExpressionNode;
} & SyntaxNode;

export const implicitStackAllocArrayCreationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat(['stackalloc', '[', ']', path.call(print, 'initializer')]);
};

export type StackAllocArrayCreationExpressionNode = {
  stackAllocKeyword: SyntaxToken;
  type: TypeNode;
  initializer: InitializerExpressionNode;
} & SyntaxNode;

export const stackAllocArrayCreationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    'stackalloc',
    ' ',
    path.call(print, 'type'),
    path.call(print, 'initializer'),
  ]);
};
