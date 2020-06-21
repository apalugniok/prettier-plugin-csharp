import { doc, Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import join = doc.builders.join;
import concat = doc.builders.concat;
import group = doc.builders.group;
import line = doc.builders.line;
import indent = doc.builders.indent;

export type BaseListNode = {
  types: TypeNode;
} & SyntaxNode;

export const baseListPrinter: Printer['print'] = (path, _, print) => {
  return group(
    concat([
      ':',
      indent(
        concat([line, join(concat([',', line]), path.map(print, 'types'))])
      ),
    ])
  );
};

export type SimpleBaseTypeNode = {
  baseType: TypeNode;
} & SyntaxNode;

export const simpleBaseTypePrinter: Printer['print'] = (path, _, print) => {
  return path.call(print, 'baseType');
};
