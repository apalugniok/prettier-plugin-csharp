import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import join = doc.builders.join;
import { NameColonNode } from './nameColon';
import indent = doc.builders.indent;
import line = doc.builders.line;
import softline = doc.builders.softline;
import group = doc.builders.group;

export type TypeArgumentListNode = {
  arguments: Array<TypeNode>;
} & SyntaxNode;

export const typeArgumentListPrinter: Printer['print'] = (path, _, print) => {
  return concat(['<', join(', ', path.map(print, 'arguments')), '>']);
};

export type BracketedArgumentListNode = {
  arguments: Array<ArgumentNode>;
};

export const bracketedArgumentListPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      '[',
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'arguments')),
        ])
      ),
      softline,
      ']',
    ])
  );
};

export type ArgumentNode = {
  nameColon: NameColonNode | null;
  expression: ExpressionNode;
  referenceKind: string;
} & SyntaxNode;

export const argumentPrinter: Printer['print'] = (path, _, print) => {
  const { nameColon, referenceKind }: ArgumentNode = path.getValue();

  return concat([
    nameColon != null ? concat([path.call(print, 'nameColon'), ' ']) : '',
    referenceKind !== '' ? concat([referenceKind, ' ']) : '', //todo no ref or out keyword is it empty or null
    path.call(print, 'expression'),
  ]);
};
