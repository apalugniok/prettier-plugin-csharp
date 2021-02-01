import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import softline = doc.builders.softline;
import group = doc.builders.group;
import indent = doc.builders.indent;
import hardline = doc.builders.hardline;

export type LockStatementNode = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  lockKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
} & SyntaxNode;

export const lockStatementPrinter: Printer<LockStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { statement }: LockStatementNode = path.getValue();

  const shouldIndentStatement = statement.nodeType !== 'Block';

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'lockKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(concat([softline, path.call(print, 'expression')])),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
    shouldIndentStatement
      ? indent(concat([hardline, path.call(print, 'statement')]))
      : concat([hardline, path.call(print, 'statement')]),
  ]);
};
