import { SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import { BracketedArgumentListNode } from './argument';

export type ElementBindingExpressionNode = {
  argumentList: BracketedArgumentListNode;
} & SyntaxNode;

export const elementBindingExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => path.call(print, 'argumentList');
