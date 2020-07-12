import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import line = doc.builders.line;
import indent = doc.builders.indent;
import group = doc.builders.group;
import { SyntaxToken } from '../syntaxToken';

export type ArrowExpressionClauseNode = {
  arrowToken: SyntaxToken;
  expression: ExpressionNode;
} & SyntaxNode;
export const arrowExpressionClausePrinter: Printer['print'] = (
  path,
  _,
  print
) =>
  group(concat(['=>', indent(concat([line, path.call(print, 'expression')]))]));
