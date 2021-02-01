import { ExpressionNode, PatternNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type IsPatternExpression = {
  expression: ExpressionNode;
  isKeyword: SyntaxToken;
  pattern: PatternNode;
} & SyntaxNode;

export const isPatternExpressionPrinter: Printer<IsPatternExpression>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'expression'),
    ' ',
    path.call(print, 'isKeyword'),
    ' ',
    path.call(print, 'pattern'),
  ]);
