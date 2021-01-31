import { doc, Printer } from 'prettier';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';

export type ConstantPatternNode = {
  expression: ExpressionNode;
} & SyntaxNode;

export const constantPatternPrinter: Printer<ConstantPatternNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'expression');
