import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type YieldStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode | null;
  returnOrBreakKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
  yieldKeyword: SyntaxToken;
} & SyntaxNode;

export const yieldStatementPrinter: Printer['print'] = (path, _, print) => {
  const {
    expression,
    returnOrBreakKeyword,
  }: YieldStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'yield ',
    returnOrBreakKeyword.text,
    expression == null ? '' : ' ',
    path.call(print, 'expression'),
    ';',
  ]);
};
