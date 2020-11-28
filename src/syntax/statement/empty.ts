import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type EmptyStatement = {
  attributeLists: Array<AttributeListNode>;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const emptyStatementPrinter: Printer['print'] = (path, _, print) =>
  concat([
    printAttributeLists(path, print),
    path.call(print, 'semicolonToken'),
  ]);
