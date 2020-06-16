import { Printer } from 'prettier';
import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from "../attribute/attributeList";
import { TypeParameterListNode } from "./typeParameterList";

export type ClassDeclaration = {
  attributeLists: Array<AttributeListNode>
  modifiers: Array<string>
  name: string,
  typeParameters: TypeParameterListNode | null
  //todo
} & SyntaxNode;

export const classDeclarationPrinter: Printer['print'] = () => {
  //todo
  return '';
};
