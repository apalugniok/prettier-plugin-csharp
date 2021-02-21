import { ExpressionNode, StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import concat = doc.builders.concat;
import group = doc.builders.group;

export type ThrowStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode | null;
  semicolonToken: SyntaxToken;
  throwKeyword: SyntaxToken;
} & StatementNode;

export const throwStatementPrinter: Printer<ThrowStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { expression }: ThrowStatementNode = path.getValue();

  return group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      path.call(print, 'throwKeyword'),
      expression == null ? '' : ' ',
      path.call(print, 'expression'),
      path.call(print, 'semicolonToken'),
    ])
  );
};
