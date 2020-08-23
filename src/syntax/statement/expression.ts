import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import group = doc.builders.group;

export type ExpressionStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode;
  semicolonToken: SyntaxToken;
  allowsAnyExpression: boolean;
} & SyntaxNode;

export const expressionStatementPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    printAttributeLists(path, print),
    group(path.call(print, 'expression')),
    ';',
  ]);
};
