import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { NameNode } from "../syntaxNode";

export type QualifiedNameNode = {
  left: NameNode;
  right: NameNode;
} & NameNode;

export const qualifiedNamePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'left'), '.', path.call(print, 'right')]);
};
