import { doc, FastPath } from 'prettier';
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import Doc = doc.builders.Doc;
import { SyntaxToken } from '../syntax/syntaxToken';
import { BlockNode } from '../syntax/statement/block';
import { ArrowExpressionClauseNode } from '../syntax/expression/arrowExpressionClause';
import concat = doc.builders.concat;
import line = doc.builders.line;
import { StatementNode } from '../syntax/syntaxNode';
import indent = doc.builders.indent;

export const printAttributeLists = (
  path: FastPath,
  print: (path: FastPath) => Doc
) => join(hardline, [...path.map(print, 'attributeLists'), '']);

export const printModifiers = (modifiers: Array<SyntaxToken>) =>
  join(' ', [...modifiers.map((token) => token.text), '']);

export const printMethodBody = (
  path: FastPath,
  print: (path: FastPath) => Doc,
  body: BlockNode | null,
  expressionBody: ArrowExpressionClauseNode | null
): Doc =>
  body != null
    ? concat([line, path.call(print, 'body')])
    : expressionBody != null
    ? concat([' ', path.call(print, 'expressionBody'), ';'])
    : '';

export const wrapInBlock = (
  statement: StatementNode,
  path: FastPath,
  print: (path: FastPath) => Doc
) =>
  statement.nodeType === 'Block'
    ? path.call(print, 'statement')
    : concat([
        '{',
        indent(concat([hardline, path.call(print, 'statement')])),
        hardline,
        '}',
      ]);
