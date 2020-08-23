import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import group = doc.builders.group;
import line = doc.builders.line;
import hardline = doc.builders.hardline;

export type IfStatementNode = {
  attributeLists: Array<AttributeListNode>;
  ifKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  condition: ExpressionNode;
  closeParenToken: SyntaxToken;
  statement: StatementNode;
  else: ElseClauseNode | null;
} & SyntaxNode;

export const ifStatementPrinter: Printer['print'] = (path, _, print) => {
  const { else: elseClause, statement }: IfStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'if',
    ' ',
    '(',
    path.call(print, 'condition'),
    ')',
    group(
      concat([
        statement.nodeType === 'Block' ? hardline : line,
        path.call(print, 'statement'),
      ])
    ),
    elseClause == null ? '' : hardline,
    path.call(print, 'else'),
  ]);
};

export type ElseClauseNode = {
  elseKeyword: SyntaxToken;
  statement: StatementNode;
} & SyntaxNode;

export const elseClausePrinter: Printer['print'] = (path, _, print) => {
  const { statement }: ElseClauseNode = path.getValue();

  return concat([
    'else',
    statement.nodeType === 'Block' ? hardline : ' ',
    path.call(print, 'statement'),
  ]);
};
