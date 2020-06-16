import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { TypeArgumentListNode } from "./typeArgumentList";
import { NameNode } from "../syntaxNode";

export type GenericNameNode = {
  name: string;
  typeArguments: TypeArgumentListNode;
} & NameNode;

export const genericNamePrinter: Printer['print'] = (path, _, print) => {
  const node: GenericNameNode = path.getValue();

  return concat([node.name, path.call(print, 'typeArguments')]);
};
