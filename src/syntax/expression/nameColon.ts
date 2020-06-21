import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { SyntaxNode } from '../syntaxNode';

export type NameColonNode = {
  name: string;
} & SyntaxNode;

export const nameColonPrinter: Printer['print'] = (path) => {
  const node: NameColonNode = path.getValue();

  return concat([node.name, ':']);
};
