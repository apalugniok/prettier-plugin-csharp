import { SyntaxToken } from '../syntaxToken';
import { SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { ArgumentNode } from './argument';
import join = doc.builders.join;
import group = doc.builders.group;
import line = doc.builders.line;
import softline = doc.builders.softline;
import indent = doc.builders.indent;

export type TupleExpressionNode = {
  closeParenToken: SyntaxToken;
  arguments: Array<ArgumentNode>;
  openParenToken: SyntaxToken;
} & SyntaxNode;

export const tupleExpressionPrinter: Printer<TupleExpressionNode>['print'] = (
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
