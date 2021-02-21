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

export const typeArgumentListPrinter: Printer<TypeArgumentListNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'lessThanToken'),
    join(', ', path.map(print, 'arguments')),
    path.call(print, 'greaterThanToken'),
  ]);

export type ArgumentListNode = {
  arguments: Array<ArgumentNode>;
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
};

export const argumentListPrinter: Printer<ArgumentListNode>['print'] = (
  path,
  _,
  print
) =>
  path.getValue().arguments.length !== 0
    ? group(
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
      )
    : concat([
        path.call(print, 'openParenToken'),
        path.call(print, 'closeParenToken'),
      ]);

export type BracketedArgumentListNode = {
  arguments: Array<ArgumentNode>;
  closeBracketToken: SyntaxToken;
  openBracketToken: SyntaxToken;
} & SyntaxNode;

export const bracketedArgumentListPrinter: Printer<BracketedArgumentListNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      path.call(print, 'openBracketToken'),
      indent(
        concat([
          softline,
          join(concat([',', line]), path.map(print, 'arguments')),
        ])
      ),
      softline,
      path.call(print, 'closeBracketToken'),
    ])
  );

export type ArgumentNode = {
  expression: ExpressionNode;
  nameColon: NameColonNode | null;
  refKindKeyword: SyntaxToken;
  // BackCompat overload see: https://docs.microsoft.com/en-us/dotnet/api/microsoft.codeanalysis.csharp.syntax.argumentsyntax?view=roslyn-dotnet
  refOrOutKeyword: SyntaxToken;
} & SyntaxNode;

export const argumentPrinter: Printer<ArgumentNode>['print'] = (
  path,
  _,
  print
) => {
  const { refKindKeyword } = path.getValue();

  return concat([
    path.call(print, 'nameColon'),
    path.call(print, 'refKindKeyword'),
    refKindKeyword.text !== '' ? ' ' : '',
    path.call(print, 'expression'),
  ]);
};
