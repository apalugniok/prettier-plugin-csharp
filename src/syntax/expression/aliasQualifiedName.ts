import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { NameNode } from "../syntaxNode";
import { IdentifierNameNode } from "./identifierName";

export type AliasQualifiedNameNode = {
  alias: IdentifierNameNode;
  name: NameNode;
} & NameNode;

export const aliasQualifiedNamePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'alias'), '::', path.call(print, 'name')]);
};
