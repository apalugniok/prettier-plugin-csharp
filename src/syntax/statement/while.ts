import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists, wrapInBlock } from '../../helpers/printerHelpers';
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

export const whileStatementPrinter: Printer['print'] = (path, _, print) => {
  const { statement }: WhileStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'while',
    ' ',
    group(
      concat([
        '(',
        indent(concat([softline, path.call(print, 'condition')])),
        softline,
        ')',
      ])
    ),
    hardline,
    wrapInBlock(statement, path, print),
  ]);
};
