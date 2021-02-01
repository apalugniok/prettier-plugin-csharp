import { SyntaxNode } from '../syntaxNode';
import { InitializerExpressionNode } from './initializer';
import { SyntaxToken } from '../syntaxToken';
import { ArrayTypeNode } from './type';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type ArrayCreationExpressionNode = {
  initializer: InitializerExpressionNode | null;
  newKeyword: SyntaxToken;
  type: ArrayTypeNode;
} & SyntaxNode;

export const arrayCreationExpressionPrinter: Printer<ArrayCreationExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'newKeyword'),
    ' ',
    path.call(print, 'type'),
    path.call(print, 'initializer'),
  ]);

export type ImplicitArrayCreationExpressionNode = {
  closeBracketToken: SyntaxToken;
  commas: Array<SyntaxToken>;
  initializer: InitializerExpressionNode | null;
  newKeyword: SyntaxToken;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

export const implicitArrayCreationExpressionPrinter: Printer<ImplicitArrayCreationExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'newKeyword'),
    path.call(print, 'openBracketToken'),
    ...path.map(print, 'commas'),
    path.call(print, 'closeBracketToken'),
    path.call(print, 'initializer'),
  ]);
