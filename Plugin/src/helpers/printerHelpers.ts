import { doc, FastPath } from 'prettier';
import join = doc.builders.join;
import hardline = doc.builders.hardline;
import Doc = doc.builders.Doc;
import { BlockNode } from '../syntax/statement/block';
import { ArrowExpressionClauseNode } from '../syntax/expression/arrowExpressionClause';
import concat = doc.builders.concat;
import line = doc.builders.line;
import { StatementNode, SyntaxNode } from '../syntax/syntaxNode';
import indent = doc.builders.indent;
import { SyntaxToken } from '../syntax/syntaxToken';
import { AttributeListNode } from '../syntax/declaration/attribute';
import group = doc.builders.group;

export const printAttributeLists = <
  TNode extends {
    attributeLists: Array<AttributeListNode>;
  }
>(
  path: FastPath<TNode>,
  print: (path: FastPath) => Doc
) => join(hardline, [...path.map(print, 'attributeLists'), '']);

export const printModifiers = <
  TNode extends {
    modifiers: Array<SyntaxToken>;
  }
>(
  path: FastPath<TNode>,
  print: (path: FastPath) => Doc
) => join(' ', [...path.map(print, 'modifiers'), '']);

export const printMethodBody = <
  TNode extends {
    body: BlockNode | null;
    expressionBody: ArrowExpressionClauseNode | null;
    semicolonToken: SyntaxToken;
  }
>(
  path: FastPath<TNode>,
  print: (path: FastPath<TNode>) => Doc
): Doc => {
  const { body, expressionBody } = path.getValue();

  return body != null
    ? concat([line, path.call(print, 'body')])
    : expressionBody != null
    ? concat([
        ' ',
        path.call(print, 'expressionBody'),
        path.call(print, 'semicolonToken'),
      ])
    : '';
};

export const wrapStatementInBlock = <
  TNode extends { statement: StatementNode }
>(
  path: FastPath<TNode>,
  print: (path: FastPath<TNode>) => Doc
) =>
  path.getValue().statement.nodeType === 'Block'
    ? path.call(print, 'statement')
    : concat([
        '{',
        group(indent(concat([hardline, path.call(print, 'statement')]))),
        hardline,
        '}',
      ]);

export const printLeadingNewLine = <TNode extends SyntaxNode>(
  path: FastPath<TNode>
): Doc => (path.getValue().hasLeadingNewLine ? hardline : '');
