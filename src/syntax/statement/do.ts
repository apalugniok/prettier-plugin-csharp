import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  printLeadingNewLine,
  wrapStatementInBlock,
} from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import group = doc.builders.group;

export type DoStatementNode = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  condition: ExpressionNode;
  doKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  semicolonToken: SyntaxToken;
  statement: StatementNode;
  whileKeyword: SyntaxToken;
} & StatementNode;

export const doStatementPrinter: Printer<DoStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'doKeyword'),
    hardline,
    wrapStatementInBlock(path, print),
    ' ',
    path.call(print, 'whileKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(concat([softline, path.call(print, 'condition')])),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
    path.call(print, 'semicolonToken'),
  ]);
