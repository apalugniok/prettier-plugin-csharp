import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type ContinueStatementNode = {
  attributeLists: Array<AttributeListNode>;
  continueKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const continueStatementPrinter: Printer<ContinueStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    path.call(print, 'continueKeyword'),
    path.call(print, 'semicolonToken'),
  ]);
