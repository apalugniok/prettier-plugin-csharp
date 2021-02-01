import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { BlockNode } from './block';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;

export type UnsafeStatementNode = {
  attributeLists: Array<AttributeListNode>;
  block: BlockNode;
  unsafeKeyword: SyntaxToken;
} & SyntaxNode;

export const unsafeStatementPrinter: Printer<UnsafeStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    path.call(print, 'unsafeKeyword'),
    hardline,
    path.call(print, 'block'),
  ]);
