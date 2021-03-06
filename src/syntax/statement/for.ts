import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { VariableDeclarationNode } from '../declaration/variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;
import softline = doc.builders.softline;
import join = doc.builders.join;
import line = doc.builders.line;
import hardline = doc.builders.hardline;
import {
  printAttributeLists,
  printLeadingNewLine,
  wrapStatementInBlock,
} from '../../helpers/printerHelpers';
import indent = doc.builders.indent;

export type ForStatementNode = {
  attributeLists: Array<AttributeListNode>;
  closeParenToken: SyntaxToken;
  condition: ExpressionNode | null;
  declaration: VariableDeclarationNode | null;
  firstSemicolonToken: SyntaxToken;
  forKeyword: SyntaxToken;
  incrementors: Array<ExpressionNode>;
  initializers: Array<ExpressionNode>;
  openParenToken: SyntaxToken;
  secondSemicolonToken: SyntaxToken;
  statement: StatementNode;
} & StatementNode;

export const forStatementPrinter: Printer<ForStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { condition }: ForStatementNode = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    path.call(print, 'forKeyword'),
    ' ',
    group(
      concat([
        path.call(print, 'openParenToken'),
        indent(
          concat([
            softline,
            group(path.call(print, 'declaration')),
            join(
              ', ',
              path.map((path) => group(print(path)), 'initializers')
            ),
            path.call(print, 'firstSemicolonToken'),
            condition == null ? '' : line,
            group(path.call(print, 'condition')),
            path.call(print, 'secondSemicolonToken'),
            line,
            join(
              ', ',
              path.map((path) => group(print(path)), 'incrementors')
            ),
          ])
        ),
        softline,
        path.call(print, 'closeParenToken'),
      ])
    ),
    hardline,
    wrapStatementInBlock(path, print),
  ]);
};
