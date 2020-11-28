import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import { BlockNode } from './block';

export type CheckedStatement = {
  attributeLists: Array<AttributeListNode>;
  keyword: SyntaxToken;
  block: BlockNode;
} & SyntaxNode;

export const checkedStatementPrinter: Printer['print'] = (path, _, print) =>
  concat([
    printAttributeLists(path, print),
    path.call(print, 'keyword'),
    hardline,
    path.call(print, 'block'),
  ]);
