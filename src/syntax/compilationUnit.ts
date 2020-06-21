import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { DeclarationNode, SyntaxNode } from './syntaxNode';
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import { ExternAliasDirectiveNode, UsingDirectiveNode } from "./directive";

export type CompilationUnitNode = {
  externs: Array<ExternAliasDirectiveNode>;
  usings: Array<UsingDirectiveNode>;
  members: Array<DeclarationNode>;
} & SyntaxNode;

export const compilationUnitPrinter: Printer['print'] = (path, _, print) => {
  const node: CompilationUnitNode = path.getValue();

  const usings =
    node.usings.length !== 0
      ? concat([join(hardline, path.map(print, 'usings')), hardline])
      : '';

  const externs =
    node.externs.length !== 0
      ? concat([join(hardline, path.map(print, 'externs')), hardline])
      : '';

  const members =
    node.members.length !== 0
      ? concat([join(hardline, path.map(print, 'members')), hardline])
      : '';

  return concat([usings, externs, members]);
};
