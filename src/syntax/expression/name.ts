import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { NameNode } from '../syntaxNode';
import { TypeArgumentListNode } from './argument';

export type AliasQualifiedNameNode = {
  alias: IdentifierNameNode;
  name: NameNode;
} & NameNode;

export const aliasQualifiedNamePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'alias'), '::', path.call(print, 'name')]);
};

export type QualifiedNameNode = {
  left: NameNode;
  right: NameNode;
} & NameNode;

export const qualifiedNamePrinter: Printer['print'] = (path, _, print) => {
  return concat([path.call(print, 'left'), '.', path.call(print, 'right')]);
};

export type GenericNameNode = {
  name: string;
  typeArguments: TypeArgumentListNode;
} & NameNode;

export const genericNamePrinter: Printer['print'] = (path, _, print) => {
  const { name }: GenericNameNode = path.getValue();

  return concat([name, path.call(print, 'typeArguments')]);
};

export type IdentifierNameNode = {
  name: string;
} & NameNode;

export const identifierNamePrinter: Printer['print'] = (path) => {
  const { name }: IdentifierNameNode = path.getValue();

  return name;
};
