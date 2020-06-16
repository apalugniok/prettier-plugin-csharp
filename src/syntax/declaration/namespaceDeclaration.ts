import { doc, Printer } from 'prettier';
import { NameNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;
import hardline = doc.builders.hardline;
import indent = doc.builders.indent;
import { UsingDirectiveNode } from '../usingDirective';
import { ExternAliasDirectiveNode } from '../externAliasDirective';
import join = doc.builders.join;
import Doc = doc.builders.Doc;

export type NamespaceDeclarationNode = {
  name: NameNode;
  usings: Array<UsingDirectiveNode>;
  externs: Array<ExternAliasDirectiveNode>;
  members: Array<SyntaxNode>;
} & SyntaxNode;

export const namespaceDeclarationPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    usings,
    externs,
    members,
  }: NamespaceDeclarationNode = path.getValue();

  const body: Array<Doc> = [];

  if (externs.length !== 0) {
    body.push(hardline, join(hardline, path.map(print, 'externs')));
  }

  if (usings.length !== 0) {
    body.push(hardline, join(hardline, path.map(print, 'usings')));
  }

  if (members.length !== 0) {
    body.push(hardline, join(hardline, path.map(print, 'members')));
  }

  return concat([
    'namespace',
    ' ',
    path.call(print, 'name'),
    hardline,
    '{',
    indent(concat(body)),
    hardline,
    '}',
  ]);
};
