import { StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type EmptyStatement = {
  attributeLists: Array<AttributeListNode>;
  semicolonToken: SyntaxToken;
} & StatementNode;

export const emptyStatementPrinter: Printer<EmptyStatement>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'semicolonToken'),
  ]);
