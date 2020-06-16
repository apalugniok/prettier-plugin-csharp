import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";
import { AttributeNode } from "./attribute";
import { AttributeTargetSpecifierNode } from "./attributeTargetSpecifier";

export type AttributeListNode = {
  target: AttributeTargetSpecifierNode | null;
  attributes: Array<AttributeNode>
} & SyntaxNode;

export const attributeListPrinter: Printer['print'] = (path) => {
  const node: AttributeListNode = path.getValue();
  //todo
  return '';
};
