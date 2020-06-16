import { doc, Printer } from 'prettier';
import { NameNode } from "./syntaxNode";
import concat = doc.builders.concat;

export type ExternAliasDirectiveNode = {
  name: string;
} & NameNode;

export const externAliasDirectivePrinter: Printer['print'] = (path) => {
  const node: ExternAliasDirectiveNode = path.getValue();

  return concat(['extern ', 'alias ', node.name, ';']);
};
