import { Printer } from 'prettier';
import { SyntaxNode } from "../syntaxNode";
import { TypeParameterNode } from "./typeParameter";

export type TypeParameterListNode = {
  parameters: Array<TypeParameterNode>;
} & SyntaxNode;

export const typeParameterListPrinter: Printer['print'] = (path) => {
  const node: TypeParameterListNode = path.getValue();
  //todo
  return '';
};
