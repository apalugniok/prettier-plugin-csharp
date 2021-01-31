import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import { BlockNode } from './block';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import join = doc.builders.join;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import group = doc.builders.group;

export type TryStatementNode = {
  attributeLists: Array<AttributeListNode>;
  tryKeyword: SyntaxToken;
  block: BlockNode;
  catches: Array<CatchClauseNode>;
  finally: FinallyClauseNode | null;
} & SyntaxNode;

export const tryStatementPrinter: Printer['print'] = (path, _, print) => {
  const { catches, finally: finallyClause }: TryStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'try',
    hardline,
    path.call(print, 'block'),
    catches.length !== 0 ? hardline : '',
    join(hardline, path.map(print, 'catches')),
    finallyClause == null || finallyClause.finallyKeyword.text === ''
      ? ''
      : concat([hardline, path.call(print, 'finally')]),
  ]);
};

export type CatchClauseNode = {
  catchKeyword: SyntaxToken;
  declaration: CatchDeclarationNode | null;
  filter: CatchFilterClauseNode | null;
  block: BlockNode;
} & SyntaxNode;

export const catchClausePrinter: Printer['print'] = (path, _, print) => {
  const { declaration, filter }: CatchClauseNode = path.getValue();

  return concat([
    concat([
      'catch',
      declaration != null ? ' ' : '',
      path.call(print, 'declaration'),
      filter != null ? ' ' : '',
      path.call(print, 'filter'),
    ]),
    hardline,
    path.call(print, 'block'),
  ]);
};

export type CatchDeclarationNode = {
  openParenToken: SyntaxToken;
  type: TypeNode;
  identifier: SyntaxToken;
  closeParenToken: SyntaxToken;
} & SyntaxNode;

export const catchDeclarationPrinter: Printer['print'] = (path, _, print) => {
  const { identifier }: CatchDeclarationNode = path.getValue();

  return group(
    concat([
      '(',
      indent(
        concat([
          softline,
          path.call(print, 'type'),
          ' ',
          path.call(print, 'identifier'),
        ])
      ),
      softline,
      ')',
    ])
  );
};

export type CatchFilterClauseNode = {
  whenKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  filterExpression: ExpressionNode;
  closeParenToken: SyntaxToken;
} & SyntaxNode;

export const catchFilterClausePrinter: Printer['print'] = (path, _, print) => {
  return concat([
    'when',
    ' ',
    group(
      concat([
        '(',
        indent(concat([softline, path.call(print, 'filterExpression')])),
        softline,
        ')',
      ])
    ),
  ]);
};

export type FinallyClauseNode = {
  finallyKeyword: SyntaxToken;
  block: BlockNode;
} & SyntaxNode;

export const finallyClausePrinter: Printer['print'] = (path, _, print) => {
  return concat(['finally', hardline, path.call(print, 'block')]);
};
