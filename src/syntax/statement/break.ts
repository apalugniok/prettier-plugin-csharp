import { SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type BreakStatementNode = {
  attributeLists: Array<AttributeListNode>;
  breakKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const breakStatementPrinter: Printer<BreakStatementNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    printAttributeLists(path, print),
    path.call(print, 'breakKeyword'),
    path.call(print, 'semicolonToken'),
  ]);
};
