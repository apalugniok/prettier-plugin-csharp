import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { VariableDeclarationNode } from '../declaration/variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  printLeadingNewLine,
  wrapStatementInBlock,
} from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import group = doc.builders.group;
import indent = doc.builders.indent;
import softline = doc.builders.softline;

export type UsingStatement = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  closeParenToken: SyntaxToken;
  declaration: VariableDeclarationNode | null;
  expression: ExpressionNode | null;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  usingKeyword: SyntaxToken;
} & StatementNode;

export const usingStatementPrinter: Printer<UsingStatement>['print'] = (
  path,
  _,
  print
) => {
  const { awaitKeyword }: UsingStatement = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'awaitKeyword'),
    awaitKeyword.text === '' ? '' : ' ',
    path.call(print, 'usingKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(
          concat([
            softline,
            path.call(print, 'declaration'),
            path.call(print, 'expression'),
          ])
        ),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
    hardline,
    wrapStatementInBlock(path, print),
  ]);
};
