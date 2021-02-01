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

export const returnStatementPrinter: Printer<ReturnStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { expression } = path.getValue();

  return concat([
    printAttributeLists(path, print),
    path.call(print, 'returnKeyword'),
    expression == null ? '' : ' ',
    path.call(print, 'expression'),
    path.call(print, 'semicolonToken'),
  ]);
};
