import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";

export type PredefinedTypeNode = {
  value: string;
} & SyntaxNode;

export const predefinedTypePrinter: Printer['print'] = (path) => {
  const node: PredefinedTypeNode = path.getValue();

  return node.value;
};
