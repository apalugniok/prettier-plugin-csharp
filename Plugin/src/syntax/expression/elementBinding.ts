import { SyntaxNode } from '../syntaxNode';
import { Printer } from 'prettier';
import { BracketedArgumentListNode } from './argument';

export type ElementBindingExpressionNode = {
  argumentList: BracketedArgumentListNode;
} & SyntaxNode;

export const elementBindingExpressionPrinter: Printer<ElementBindingExpressionNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'argumentList');
