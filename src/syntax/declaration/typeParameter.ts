import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";
import { AttributeListNode } from "../attribute/attributeList";

export type TypeParameterNode = {
  attributeLists: Array<AttributeListNode>;
  variance: string;
  name: string;
} & SyntaxNode;

export const typeParameterPrinter: Printer['print'] = (path) => {
  const node: TypeParameterNode = path.getValue();
  //todo
  return '';
};
