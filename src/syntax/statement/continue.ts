import { StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type ContinueStatementNode = {
  attributeLists: Array<AttributeListNode>;
  continueKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & StatementNode;

export const continueStatementPrinter: Printer<ContinueStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'continueKeyword'),
    path.call(print, 'semicolonToken'),
  ]);
