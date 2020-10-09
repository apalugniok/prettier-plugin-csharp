import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import hardline = doc.builders.hardline;
import indent = doc.builders.indent;
import join = doc.builders.join;
import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, PatternNode, SyntaxNode } from '../syntaxNode';
import group = doc.builders.group;

export type SwitchExpressionNode = {
  arms: Array<SwitchExpressionArmNode> | null;
  closeBraceToken: SyntaxToken;
  governingExpression: ExpressionNode;
  openBraceToken: SyntaxToken;
  switchKeyword: SyntaxToken;
} & SyntaxNode;

export const switchExpressionPrinter: Printer['print'] = (path, _, print) => {
  const { arms }: SwitchExpressionNode = path.getValue();

  const hasArms = arms?.length !== 0;

  const switchExpressionBlock = hasArms
    ? concat([
        hardline,
        '{',
        indent(
          concat([
            hardline,
            join(
              concat([',', hardline]),
              path.map((fastPath) => group(print(fastPath)), 'arms')
            ),
            ',',
          ])
        ),
        hardline,
        '}',
      ])
    : ' {}';

  return concat([
    path.call(print, 'governingExpression'),
    ' ',
    'switch',
    switchExpressionBlock,
  ]);
};

export type SwitchExpressionArmNode = {
  equalsGreaterThanToken: SyntaxToken;
  expression: ExpressionNode;
  pattern: PatternNode;
  whenClause: WhenClauseNode | null;
} & SyntaxNode;

export const switchExpressionArmPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { whenClause }: SwitchExpressionArmNode = path.getValue();

  return concat([
    path.call(print, 'pattern'),
    whenClause == null ? '' : ' ',
    path.call(print, 'whenClause'),
    ' ',
    '=>',
    ' ',
    path.call(print, 'expression'),
  ]);
};

export type WhenClauseNode = {
  condition: ExpressionNode;
  whenKeyword: SyntaxToken;
} & SyntaxNode;

export const whenClausePrinter: Printer['print'] = (path, _, print) => {
  return concat(['when', ' ', path.call(print, 'condition')]);
};
