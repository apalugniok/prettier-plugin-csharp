import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode, TypeNode } from "../syntaxNode";
import join = doc.builders.join;


export type TypeArgumentListNode = {
  arguments: Array<TypeNode>;
} & SyntaxNode;

export const typeArgumentListPrinter: Printer['print'] = (path, _, print) => {
  return concat(['<', join(', ', path.map(print, 'arguments')), '>']);
};
