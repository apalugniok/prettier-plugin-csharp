import { doc, Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import join = doc.builders.join;
import concat = doc.builders.concat;
import group = doc.builders.group;
import line = doc.builders.line;
import indent = doc.builders.indent;
import { SyntaxToken } from '../syntaxToken';

export type BaseListNode = {
  colonToken: SyntaxToken;
  types: TypeNode;
} & SyntaxNode;

export const baseListPrinter: Printer<BaseListNode>['print'] = (
  path,
  _,
  print
) => {
  return group(
    concat([
      ' ',
      path.call(print, 'colonToken'),
      indent(
        concat([line, join(concat([',', line]), path.map(print, 'types'))])
      ),
    ])
  );
};

export type SimpleBaseTypeNode = {
  type: TypeNode;
} & SyntaxNode;

export const simpleBaseTypePrinter: Printer<SimpleBaseTypeNode>['print'] = (
  path,
  _,
  print
) => path.call(print, 'type');
