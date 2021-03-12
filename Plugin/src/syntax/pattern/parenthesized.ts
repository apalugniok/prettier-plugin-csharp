import { doc, Printer } from 'prettier';
import { PatternNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import concat = doc.builders.concat;

export type ParenthesizedPatternNode = {
  closeParenToken: SyntaxToken;
  openParenToken: SyntaxToken;
  pattern: PatternNode;
} & SyntaxNode;

export const parenthesizedPatternPrinter: Printer<ParenthesizedPatternNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'openParenToken'),
    path.call(print, 'pattern'),
    path.call(print, 'closeParenToken'),
  ]);
