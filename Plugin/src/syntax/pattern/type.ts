import { Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';

export type TypePatternNode = {
  type: TypeNode;
} & SyntaxNode;

export const typePatternPrinter: Printer<TypePatternNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'type');
