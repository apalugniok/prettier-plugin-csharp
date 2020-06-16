import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";
import { AttributeArgumentNode } from "./attributeArgument";

export type AttributeArgumentListNode = {
  arguments: Array<AttributeArgumentNode>;
} & SyntaxNode;

export const attributeArgumentListPrinter: Printer['print'] = (path) => {
  const node: AttributeArgumentListNode = path.getValue();
  //todo
  return '';
};
