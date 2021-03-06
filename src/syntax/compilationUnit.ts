import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { DeclarationNode, SyntaxNode } from './syntaxNode';
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import { ExternAliasDirectiveNode, UsingDirectiveNode } from './directive';
import { SyntaxToken } from './syntaxToken';

export type CompilationUnitNode = {
  endOfFileToken: SyntaxToken;
  externs: Array<ExternAliasDirectiveNode>;
  members: Array<DeclarationNode>;
  usings: Array<UsingDirectiveNode>;
} & SyntaxNode;

export const compilationUnitPrinter: Printer<CompilationUnitNode>['print'] = (
  path,
  _,
  print
) => {
  const node: CompilationUnitNode = path.getValue();

  const usings =
    node.usings.length !== 0 ? join(hardline, path.map(print, 'usings')) : '';

  const externs =
    node.externs.length !== 0 ? join(hardline, path.map(print, 'externs')) : '';

  const members =
    node.members.length !== 0
      ? concat([join(hardline, path.map(print, 'members'))])
      : '';

  return concat([
    usings,
    externs,
    members,
    hardline,
    path.call(print, 'endOfFileToken'),
  ]);
};
