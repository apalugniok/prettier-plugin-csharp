import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type ReturnStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode | null;
  returnKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const returnStatementPrinter: Printer['print'] = (path, _, print) => {
  const { expression }: ReturnStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'return',
    expression == null ? '' : ' ',
    path.call(print, 'expression'),
    ';',
  ]);
};
