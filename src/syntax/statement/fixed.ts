import { StatementNode, SyntaxNode } from '../syntaxNode';
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

export type FixedStatement = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  declaration: VariableDeclarationNode;
  fixedKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
} & StatementNode;

export const fixedStatementPrinter: Printer<FixedStatement>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'fixedKeyword'),
    ' ',
    path.call(print, 'openParenToken'),
    path.call(print, 'declaration'),
    path.call(print, 'closeParenToken'),
    hardline,
    wrapStatementInBlock(path, print),
  ]);
