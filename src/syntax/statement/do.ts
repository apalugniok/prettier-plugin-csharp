import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists, wrapInBlock } from '../../helpers/printerHelpers';
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
} & SyntaxNode;

export const doStatementPrinter: Printer['print'] = (path, _, print) => {
  const { statement }: DoStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'do',
    hardline,
    wrapInBlock(statement, path, print),
    ' ',
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
    ';',
  ]);
};
