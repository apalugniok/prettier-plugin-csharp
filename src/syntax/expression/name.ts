import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { NameNode } from '../syntaxNode';
import { TypeArgumentListNode } from './argument';
import { SyntaxToken } from '../syntaxToken';

export type AliasQualifiedNameNode = {
  alias: IdentifierNameNode;
  colonColonToken: SyntaxToken;
  name: NameNode;
} & NameNode;

export const aliasQualifiedNamePrinter: Printer['print'] = (path, _, print) =>
  concat([path.call(print, 'alias'), '::', path.call(print, 'name')]);

export type QualifiedNameNode = {
  dotToken: SyntaxToken;
  left: NameNode;
  right: NameNode;
} & NameNode;

export const qualifiedNamePrinter: Printer['print'] = (path, _, print) =>
  concat([path.call(print, 'left'), '.', path.call(print, 'right')]);

export type GenericNameNode = {
  identifier: SyntaxToken;
  isUnboundGenericName: boolean;
  typeArgumentList: TypeArgumentListNode;
} & NameNode;

export const genericNamePrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: GenericNameNode = path.getValue();

  return concat([
    path.call(print, 'identifier'),
    path.call(print, 'typeArgumentList'),
  ]);
};

export type IdentifierNameNode = {
  identifier: SyntaxToken;
} & NameNode;

export const identifierNamePrinter: Printer['print'] = (path, _, print) =>
  path.call(print, 'identifier');
