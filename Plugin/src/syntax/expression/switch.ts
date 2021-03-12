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

export const switchExpressionPrinter: Printer<SwitchExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  const { arms } = path.getValue();

  const hasArms = arms?.length !== 0;

  const switchExpressionBlock = hasArms
    ? concat([
        hardline,
        path.call(print, 'openBraceToken'),
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
        path.call(print, 'closeBraceToken'),
      ])
    : concat([
        ' ',
        path.call(print, 'openBraceToken'),
        ' ',
        path.call(print, 'closeBraceToken'),
      ]);

  return concat([
    path.call(print, 'governingExpression'),
    ' ',
    path.call(print, 'switchKeyword'),
    switchExpressionBlock,
  ]);
};

export type SwitchExpressionArmNode = {
  equalsGreaterThanToken: SyntaxToken;
  expression: ExpressionNode;
  pattern: PatternNode;
  whenClause: WhenClauseNode | null;
} & SyntaxNode;

export const switchExpressionArmPrinter: Printer<SwitchExpressionArmNode>['print'] = (
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
    path.call(print, 'equalsGreaterThanToken'),
    ' ',
    path.call(print, 'expression'),
  ]);
};

export type WhenClauseNode = {
  condition: ExpressionNode;
  whenKeyword: SyntaxToken;
} & SyntaxNode;

export const whenClausePrinter: Printer<WhenClauseNode>['print'] = (
  path,
  _,
  print
) =>
  concat([path.call(print, 'whenKeyword'), ' ', path.call(print, 'condition')]);
