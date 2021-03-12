import { SyntaxToken } from '../syntaxToken';
import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import group = doc.builders.group;

export type ExpressionStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode;
  semicolonToken: SyntaxToken;
  allowsAnyExpression: boolean;
} & StatementNode;

export const expressionStatementPrinter: Printer<ExpressionStatementNode>['print'] = (
  path,
  _,
  print
) => {
  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    group(path.call(print, 'expression')),
    path.call(print, 'semicolonToken'),
  ]);
};
