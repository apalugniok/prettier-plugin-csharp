import { ExpressionNode, PatternNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;

export type IsPatternExpression = {
  expression: ExpressionNode;
  isKeyword: SyntaxToken;
  pattern: PatternNode;
} & SyntaxNode;

export const isPatternExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'expression'),
    ' ',
    'is',
    ' ',
    path.call(print, 'pattern'),
  ]);
};
