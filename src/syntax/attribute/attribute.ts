import { Printer } from 'prettier';
import { NameNode, SyntaxNode } from "../syntaxNode";
import { AttributeArgumentListNode } from "./attributeArgumentList";

export type AttributeNode = {
  name: NameNode
  arguments: Array<AttributeArgumentListNode> | null;
} & SyntaxNode;

export const attributePrinter: Printer['print'] = (path) => {
  const node: AttributeNode = path.getValue();
  //todo
  return '';
};
