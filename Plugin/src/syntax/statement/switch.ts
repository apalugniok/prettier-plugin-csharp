import {
  ExpressionNode,
  PatternNode,
  StatementNode,
  SyntaxNode,
} from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { WhenClauseNode } from '../expression/switch';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;
import softline = doc.builders.softline;
import indent = doc.builders.indent;
import hardline = doc.builders.hardline;
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import join = doc.builders.join;

export type SwitchStatementNode = {
  attributeLists: Array<AttributeListNode>;
  closeBraceToken: SyntaxToken;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  openBraceToken: SyntaxToken;
  openParenToken: SyntaxToken;
  sections: Array<SwitchSectionNode>;
  switchKeyword: SyntaxToken;
} & StatementNode;

export const switchStatementPrinter: Printer<SwitchStatementNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'switchKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(concat([softline, path.call(print, 'expression')])),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
    hardline,
    path.call(print, 'openBraceToken'),
    indent(concat([hardline, join(hardline, path.map(print, 'sections'))])),
    hardline,
    path.call(print, 'closeBraceToken'),
  ]);
};

export type SwitchSectionNode = {
  labels: Array<
    CasePattenSwitchLabelNode | CaseSwitchLabelNode | DefaultSwitchLabelNode
  >;
  statements: Array<StatementNode>;
} & SyntaxNode;

export const switchSectionPrinter: Printer<SwitchSectionNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    join(hardline, path.map(print, 'labels')),
    indent(concat([hardline, join(hardline, path.map(print, 'statements'))])),
  ]);

export type CasePattenSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
  pattern: PatternNode;
  whenClause: WhenClauseNode | null;
} & SyntaxNode;

export const casePatternSwitchLabelPrinter: Printer<CasePattenSwitchLabelNode>['print'] = (
  path,
  _,
  print
) => {
  const { whenClause } = path.getValue();

  return concat([
    path.call(print, 'keyword'),
    ' ',
    path.call(print, 'pattern'),
    whenClause == null ? '' : ' ',
    path.call(print, 'whenClause'),
    path.call(print, 'colonToken'),
  ]);
};

export type CaseSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const caseSwitchLabelPrinter: Printer<CaseSwitchLabelNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'keyword'),
    ' ',
    path.call(print, 'value'),
    path.call(print, 'colonToken'),
  ]);

export type DefaultSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
} & SyntaxNode;

export const defaultSwitchLabelPrinter: Printer<DefaultSwitchLabelNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'keyword'), path.call(print, 'colonToken')]);
