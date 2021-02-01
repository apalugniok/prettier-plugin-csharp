import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import group = doc.builders.group;
import line = doc.builders.line;
import hardline = doc.builders.hardline;
import softline = doc.builders.softline;
import indent = doc.builders.indent;

export type IfStatementNode = {
  attributeLists: Array<AttributeListNode>;
  ifKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  condition: ExpressionNode;
  closeParenToken: SyntaxToken;
  statement: StatementNode;
  else: ElseClauseNode | null;
} & SyntaxNode;

export const ifStatementPrinter: Printer<IfStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { else: elseClause, statement } = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'ifKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(concat([softline, path.call(print, 'condition')])),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
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

export const elseClausePrinter: Printer<ElseClauseNode>['print'] = (
  path,
  _,
  print
) => {
  const { statement }: ElseClauseNode = path.getValue();

  return concat([
    path.call(print, 'elseKeyword'),
    statement.nodeType === 'Block' ? hardline : ' ',
    path.call(print, 'statement'),
  ]);
};
