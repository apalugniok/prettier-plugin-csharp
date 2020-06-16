import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";

export type AttributeArgumentNode = {
  //todo
} & SyntaxNode;

export const attributeArgumentPrinter: Printer['print'] = (path) => {
  const node: AttributeArgumentNode = path.getValue();
  //todo
  return '';
};
