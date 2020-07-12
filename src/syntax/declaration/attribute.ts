import { doc, Printer } from 'prettier';
import { ExpressionNode, NameNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;
import { NameEqualsNode } from '../expression/nameEquals';
import { NameColonNode } from '../expression/nameColon';
import join = doc.builders.join;
import group = doc.builders.group;
import indent = doc.builders.indent;
import softline = doc.builders.softline;
import line = doc.builders.line;
import { SyntaxToken } from '../syntaxToken';

export type AttributeListNode = {
  attributes: Array<AttributeNode>;
  closeBracketToken: SyntaxToken;
  openBracketToken: SyntaxToken;
  target: AttributeTargetSpecifierNode | null;
} & SyntaxNode;

export const attributeListPrinter: Printer['print'] = (path, _, print) => {
  const { target }: AttributeListNode = path.getValue();

  return concat([
    '[',
    target != null ? concat([path.call(print, 'target'), ' ']) : '',
    join(', ', path.map(print, 'attributes')),
    ']',
  ]);
};

export type AttributeTargetSpecifierNode = {
  colonToken: SyntaxToken;
  identifier: SyntaxToken;
} & SyntaxNode;

export const attributeTargetSpecifierPrinter: Printer['print'] = (path) => {
  const { identifier }: AttributeTargetSpecifierNode = path.getValue();

  return `${identifier.text}:`;
};

export type AttributeNode = {
  name: NameNode;
  argumentList: AttributeArgumentListNode | null;
} & SyntaxNode;

export const attributePrinter: Printer['print'] = (path, _, print) => {
  const node: AttributeNode = path.getValue();

  return concat([
    path.call(print, 'name'),
    node.argumentList != null ? path.call(print, 'argumentList') : '',
  ]);
};

export type AttributeArgumentListNode = {
  arguments: Array<AttributeArgumentNode>;
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const attributeArgumentListPrinter: Printer['print'] = (
  path,
  _,
  print
) =>
  group(
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

export type AttributeArgumentNode = {
  nameEquals: NameEqualsNode | null;
  nameColon: NameColonNode | null;
  expression: ExpressionNode;
} & SyntaxNode;

export const attributeArgumentPrinter: Printer['print'] = (path, _, print) => {
  const { nameColon, nameEquals }: AttributeArgumentNode = path.getValue();

  const argumentNameSpecifier =
    nameColon != null
      ? concat([path.call(print, 'nameColon'), ' '])
      : nameEquals != null
      ? concat([path.call(print, 'nameEquals'), ' '])
      : '';

  return concat([argumentNameSpecifier, path.call(print, 'expression')]);
};
