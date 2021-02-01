import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  wrapStatementInBlock,
} from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import group = doc.builders.group;
import softline = doc.builders.softline;
import indent = doc.builders.indent;

export type WhileStatementNode = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  condition: ExpressionNode;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  whileKeyword: SyntaxToken;
} & SyntaxNode;

export const whileStatementPrinter: Printer<WhileStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
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
    hardline,
    wrapStatementInBlock(path, print),
  ]);
