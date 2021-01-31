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

export const attributeListPrinter: Printer<AttributeListNode>['print'] = (
  path,
  _,
  print
) => {
  const { target } = path.getValue();

  return concat([
    path.call(print, 'openBracketToken'),
    target != null ? concat([path.call(print, 'target'), ' ']) : '',
    join(', ', path.map(print, 'attributes')),
    path.call(print, 'closeBracketToken'),
  ]);
};

export type AttributeTargetSpecifierNode = {
  colonToken: SyntaxToken;
  identifier: SyntaxToken;
} & SyntaxNode;

export const attributeTargetSpecifierPrinter: Printer<AttributeTargetSpecifierNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'identifier'), path.call(print, 'colonToken')]);

export type AttributeNode = {
  name: NameNode;
  argumentList: AttributeArgumentListNode | null;
} & SyntaxNode;

export const attributePrinter: Printer<AttributeNode>['print'] = (
  path,
  _,
  print
) => {
  const { argumentList } = path.getValue();

  return concat([
    path.call(print, 'name'),
    argumentList != null ? path.call(print, 'argumentList') : '',
  ]);
};

export type AttributeArgumentListNode = {
  arguments: Array<AttributeArgumentNode>;
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const attributeArgumentListPrinter: Printer<AttributeArgumentListNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      path.call(print, 'openParenToken'),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'arguments')),
        ])
      ),
      softline,
      path.call(print, 'closeParenToken'),
    ])
  );

export type AttributeArgumentNode = {
  nameEquals: NameEqualsNode | null;
  nameColon: NameColonNode | null;
  expression: ExpressionNode;
} & SyntaxNode;

export const attributeArgumentPrinter: Printer<AttributeArgumentNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'nameColon'),
    path.call(print, 'nameEquals'),
    path.call(print, 'expression'),
  ]);
