import { Printer } from 'prettier';
import { NameNode } from "../syntaxNode";

export type IdentifierNameNode = {
  name: string;
} & NameNode;

export const identifierNamePrinter: Printer['print'] = (path) => {
  const node: IdentifierNameNode = path.getValue();

  return node.name;
};
