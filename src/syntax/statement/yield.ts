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

export const yieldStatementPrinter: Printer<YieldStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { expression } = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'yieldKeyword'),
    ' ',
    path.call(print, 'returnOrBreakKeyword'),
    expression == null ? '' : ' ',
    path.call(print, 'expression'),
    path.call(print, 'semicolonToken'),
  ]);
};
