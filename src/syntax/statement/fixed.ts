import { StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { VariableDeclarationNode } from '../declaration/variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists, wrapInBlock } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;

export type FixedStatement = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  declaration: VariableDeclarationNode;
  fixedKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
} & SyntaxNode;

export const fixedStatementPrinter: Printer['print'] = (path, _, print) => {
  const { statement }: FixedStatement = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'fixedKeyword'),
    ' ',
    path.call(print, 'openParenToken'),
    path.call(print, 'declaration'),
    path.call(print, 'closeParenToken'),
    hardline,
    wrapInBlock(statement, path, print),
  ]);
};
