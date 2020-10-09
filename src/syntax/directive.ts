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

export const usingDirectivePrinter: Printer['print'] = (path, _, print) => {
  const { alias, staticKeyword }: UsingDirectiveNode = path.getValue();

  return concat([
    'using ',
    staticKeyword.text !== '' ? 'static ' : '',
    path.call(print, 'alias'),
    path.call(print, 'name'),
    ';',
  ]);
};

export type ExternAliasDirectiveNode = {
  aliasKeyword: SyntaxToken;
  externKeyword: SyntaxToken;
  identifier: SyntaxToken;
  semicolonToken: SyntaxToken;
} & NameNode;

export const externAliasDirectivePrinter: Printer['print'] = (path) => {
  const { identifier }: ExternAliasDirectiveNode = path.getValue();

  return concat(['extern ', 'alias ', identifier.text, ';']);
};
