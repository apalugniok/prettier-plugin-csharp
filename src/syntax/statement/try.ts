import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import {
  ExpressionNode,
  StatementNode,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { doc, Printer } from 'prettier';
import { BlockNode } from './block';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
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
} & StatementNode;

export const tryStatementPrinter: Printer<TryStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { catches, finally: finallyClause }: TryStatementNode = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'tryKeyword'),
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

export const catchClausePrinter: Printer<CatchClauseNode>['print'] = (
  path,
  _,
  print
) => {
  const { declaration, filter } = path.getValue();

  return concat([
    concat([
      path.call(print, 'catchKeyword'),
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

export const catchDeclarationPrinter: Printer<CatchDeclarationNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      path.call(print, 'openParenToken'),
      indent(
        concat([
          softline,
          path.call(print, 'type'),
          ' ',
          path.call(print, 'identifier'),
        ])
      ),
      softline,
      path.call(print, 'closeParenToken'),
    ])
  );

export type CatchFilterClauseNode = {
  whenKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  filterExpression: ExpressionNode;
  closeParenToken: SyntaxToken;
} & SyntaxNode;

export const catchFilterClausePrinter: Printer<CatchFilterClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'whenKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(concat([softline, path.call(print, 'filterExpression')])),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
  ]);

export type FinallyClauseNode = {
  finallyKeyword: SyntaxToken;
  block: BlockNode;
} & SyntaxNode;

export const finallyClausePrinter: Printer<FinallyClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'finallyKeyword'),
    hardline,
    path.call(print, 'block'),
  ]);
