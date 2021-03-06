import { doc, Printer } from 'prettier';
import { PatternNode, SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';
import concat = doc.builders.concat;
import indent = doc.builders.indent;
import dedent = doc.builders.dedent;
import line = doc.builders.line;

export type BinaryPatternNode = {
  operatorToken: SyntaxToken;
  left: PatternNode;
  right: PatternNode;
} & SyntaxNode;

export const binaryPatternPrinter: Printer<BinaryPatternNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'left'),
    indent(
      concat([
        line,
        path.call(print, 'operatorToken'),
        ' ',
        dedent(path.call(print, 'right')),
      ])
    ),
  ]);
