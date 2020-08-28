import { doc, Printer } from 'prettier';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import concat = doc.builders.concat;

export type ConstantPatternNode = {
  expression: ExpressionNode;
} & SyntaxNode;

export const constantPatternPrinter: Printer['print'] = (path, _, print) =>
  path.call(print, 'expression');
