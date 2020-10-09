import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import join = doc.builders.join;
import { NameColonNode } from './nameColon';
import indent = doc.builders.indent;
import line = doc.builders.line;
import softline = doc.builders.softline;
import group = doc.builders.group;
import { SyntaxToken } from '../syntaxToken';

export type TypeArgumentListNode = {
  arguments: Array<TypeNode>;
  greaterThanToken: SyntaxToken;
  lessThanToken: SyntaxToken;
} & SyntaxNode;

export const typeArgumentListPrinter: Printer['print'] = (path, _, print) =>
  concat(['<', join(', ', path.map(print, 'arguments')), '>']);

export type ArgumentListNode = {
  arguments: Array<ArgumentNode>;
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
};

export const argumentListPrinter: Printer['print'] = (path, _, print) => {
  return group(
    concat([
      '(',
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'arguments')),
        ])
      ),
      softline,
      ')',
    ])
  );
};

export type BracketedArgumentListNode = {
  arguments: Array<ArgumentNode>;
  closeBracketToken: SyntaxToken;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

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
  expression: ExpressionNode;
  nameColon: NameColonNode | null;
  refKindKeyword: SyntaxToken;
  refOrOutKeyword: SyntaxToken;
} & SyntaxNode;

export const argumentPrinter: Printer['print'] = (path, _, print) => {
  const { refOrOutKeyword }: ArgumentNode = path.getValue();

  return concat([
    path.call(print, 'nameColon'),
    refOrOutKeyword.text !== '' ? concat([refOrOutKeyword.text, ' ']) : '',
    path.call(print, 'expression'),
  ]);
};
