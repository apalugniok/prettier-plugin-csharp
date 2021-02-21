import { StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import { BlockNode } from './block';
import group = doc.builders.group;

export type CheckedStatement = {
  attributeLists: Array<AttributeListNode>;
  keyword: SyntaxToken;
  block: BlockNode;
} & StatementNode;

export const checkedStatementPrinter: Printer<CheckedStatement>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'keyword'),
    hardline,
    path.call(print, 'block'),
  ]);
