import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import line = doc.builders.line;
import indent = doc.builders.indent;
import group = doc.builders.group;

export type ConditionalExpressionNode = {
  colonToken: SyntaxToken;
  condition: ExpressionNode;
  questionToken: SyntaxToken;
  whenFalse: ExpressionNode;
  whenTrue: ExpressionNode;
} & SyntaxNode;

export const conditionalExpressionPrinter: Printer<ConditionalExpressionNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      path.call(print, 'condition'),
      indent(
        concat([
          line,
          path.call(print, 'questionToken'),
          ' ',
          path.call(print, 'whenTrue'),
          line,
          path.call(print, 'colonToken'),
          ' ',
          path.call(print, 'whenFalse'),
        ])
      ),
    ])
  );
