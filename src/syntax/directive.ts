import { doc, Printer } from 'prettier';
import { NameNode, SyntaxNode } from "./syntaxNode";
import concat = doc.builders.concat;
import { NameEqualsNode } from "./expression/nameEquals";

export type UsingDirectiveNode = {
  static: boolean;
  alias: NameEqualsNode | null;
  name: NameNode;
} & SyntaxNode;

export const usingDirectivePrinter: Printer['print'] = (path, _, print) => {
  const { alias, static: staticKeyword }: UsingDirectiveNode = path.getValue();

  return concat([
    'using ',
    staticKeyword ? 'static ' : '',
    alias != null ? concat([path.call(print, 'alias'), ' ']) : '',
    path.call(print, 'name'),
    ';',
  ]);
};

export type ExternAliasDirectiveNode = {
  name: string;
} & NameNode;

export const externAliasDirectivePrinter: Printer['print'] = (path) => {
  const { name }: ExternAliasDirectiveNode = path.getValue();

  return concat(['extern ', 'alias ', name, ';']);
};
