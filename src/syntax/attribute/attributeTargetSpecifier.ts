import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";

export type AttributeTargetSpecifierNode = {
  target: string;
} & SyntaxNode;

export const attributeTargetSpecifierPrinter: Printer['print'] = (path) => {
  const node: AttributeTargetSpecifierNode = path.getValue();
  //todo
  return '';
};
