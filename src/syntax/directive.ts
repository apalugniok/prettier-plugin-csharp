import { doc, Printer } from 'prettier';
import { NameNode, SyntaxNode } from './syntaxNode';
import concat = doc.builders.concat;
import { NameEqualsNode } from './expression/nameEquals';
import { SyntaxToken } from './syntaxToken';

export type UsingDirectiveNode = {
  alias: NameEqualsNode | null;
  name: NameNode;
  semicolonToken: SyntaxToken;
  staticKeyword: SyntaxToken;
  usingKeyword: SyntaxToken;
} & SyntaxNode;

export const usingDirectivePrinter: Printer<UsingDirectiveNode>['print'] = (
  path,
  _,
  print
) => {
  const { staticKeyword }: UsingDirectiveNode = path.getValue();

  return concat([
    path.call(print, 'usingKeyword'),
    ' ',
    staticKeyword.text !== ''
      ? concat([path.call(print, 'staticKeyword'), ' '])
      : '',
    path.call(print, 'alias'),
    path.call(print, 'name'),
    path.call(print, 'semicolonToken'),
  ]);
};

export type ExternAliasDirectiveNode = {
  aliasKeyword: SyntaxToken;
  externKeyword: SyntaxToken;
  identifier: SyntaxToken;
  semicolonToken: SyntaxToken;
} & NameNode;

export const externAliasDirectivePrinter: Printer<ExternAliasDirectiveNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'externKeyword'),
    ' ',
    path.call(print, 'aliasKeyword'),
    ' ',
    path.call(print, 'identifier'),
    path.call(print, 'semicolonToken'),
  ]);
