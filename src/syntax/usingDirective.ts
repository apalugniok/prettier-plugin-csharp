import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { NameNode, SyntaxNode } from './syntaxNode';
import { NameEqualsNode } from "./expression/nameEquals";

export type UsingDirectiveNode = {
  static: boolean;
  alias: NameEqualsNode | null;
  name: NameNode;
} & SyntaxNode;

export const usingDirectivePrinter: Printer['print'] = (path, _, print) => {
  const node: UsingDirectiveNode = path.getValue();

  const staticKeyword = node.static ? 'static ' : '';
  const alias =
    node.alias != null ? concat([path.call(print, 'alias'), ' ']) : '';

  return concat([
    'using ',
    staticKeyword,
    alias,
    path.call(print, 'name'),
    ';',
  ]);
};
