import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode } from '../syntaxNode';

export type NameEqualsNode = {
  name: string;
} & SyntaxNode;

export const nameEqualsPrinter: Printer['print'] = (path) => {
  const node: NameEqualsNode = path.getValue();

  return concat([node.name, ' ', '=']);
};
