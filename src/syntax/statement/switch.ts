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
import { printAttributeLists } from '../../helpers/printerHelpers';
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
} & SyntaxNode;

export const switchStatementPrinter: Printer['print'] = (path, _, print) => {
  return concat([
    printAttributeLists(path, print),
    'switch ',
    group(
      concat([
        '(',
        indent(concat([softline, path.call(print, 'expression')])),
        softline,
        ')',
      ])
    ),
    hardline,
    '{',
    indent(concat([hardline, join(hardline, path.map(print, 'sections'))])),
    hardline,
    '}',
  ]);
};

export type SwitchSectionNode = {
  labels: Array<
    CasePattenSwitchLabelNode | CaseSwitchLabelNode | DefaultSwitchLabelNode
  >;
  statements: Array<StatementNode>;
} & SyntaxNode;

export const switchSectionPrinter: Printer['print'] = (path, _, print) => {
  return concat([
    join(hardline, path.map(print, 'labels')),
    indent(concat([hardline, join(hardline, path.map(print, 'statements'))])),
  ]);
};

export type CasePattenSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
  pattern: PatternNode;
  whenClause: WhenClauseNode | null;
} & SyntaxNode;

export const casePatternSwitchLabelPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { keyword, whenClause }: CasePattenSwitchLabelNode = path.getValue();

  return concat([
    keyword.text,
    ' ',
    path.call(print, 'pattern'),
    whenClause == null ? '' : ' ',
    path.call(print, 'whenClause'),
    ':',
  ]);
};

export type CaseSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
  value: ExpressionNode;
} & SyntaxNode;

export const caseSwitchLabelPrinter: Printer['print'] = (path, _, print) => {
  const { keyword }: CaseSwitchLabelNode = path.getValue();
  return concat([keyword.text, ' ', path.call(print, 'value'), ':']);
};

export type DefaultSwitchLabelNode = {
  colonToken: SyntaxToken;
  keyword: SyntaxToken;
} & SyntaxNode;

export const defaultSwitchLabelPrinter: Printer['print'] = (path, _, print) => {
  const { keyword }: DefaultSwitchLabelNode = path.getValue();

  return concat([keyword.text, ':']);
};
