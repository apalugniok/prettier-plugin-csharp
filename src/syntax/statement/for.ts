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
import { printAttributeLists, wrapInBlock } from '../../helpers/printerHelpers';
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
} & SyntaxNode;

export const forStatementPrinter: Printer['print'] = (path, _, print) => {
  const { condition, statement }: ForStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'for',
    ' ',
    group(
      concat([
        '(',
        indent(
          concat([
            softline,
            path.call(print, 'declaration'),
            join(', ', path.map(print, 'initializers')),
            ';',
            condition == null ? '' : line,
            path.call(print, 'condition'),
            ';',
            line,
            join(', ', path.map(print, 'incrementors')),
          ])
        ),
        softline,
        ')',
      ])
    ),
    hardline,
    wrapInBlock(statement, path, print),
  ]);
};
