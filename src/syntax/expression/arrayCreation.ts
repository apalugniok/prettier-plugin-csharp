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

export const arrayCreationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    'new ',
    path.call(print, 'type'),
    path.call(print, 'initializer'),
  ]);
};

export type ImplicitArrayCreationExpressionNode = {
  closeBracketToken: SyntaxToken;
  commas: Array<SyntaxToken>;
  initializer: InitializerExpressionNode | null;
  newKeyword: SyntaxToken;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

export const implicitArrayCreationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { commas }: ImplicitArrayCreationExpressionNode = path.getValue();

  return concat([
    'new',
    '[',
    ...commas.map((comma) => comma.text),
    ']',
    path.call(print, 'initializer'),
  ]);
};
