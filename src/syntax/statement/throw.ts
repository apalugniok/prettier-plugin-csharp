import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import { printAttributeLists } from '../../helpers/printerHelpers';
import concat = doc.builders.concat;

export type ThrowStatementNode = {
  attributeLists: Array<AttributeListNode>;
  expression: ExpressionNode | null;
  semicolonToken: SyntaxToken;
  throwKeyword: SyntaxToken;
} & SyntaxNode;

export const throwStatementPrinter: Printer['print'] = (path, _, print) => {
  const { expression }: ThrowStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'throw',
    expression == null ? '' : ' ',
    path.call(print, 'expression'),
    ';',
  ]);
};
