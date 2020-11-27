import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';

export type GotoStatementNode = {
  attributeLists: Array<AttributeListNode>;
  caseOrDefaultKeyword: SyntaxToken;
  expression: ExpressionNode | null;
  gotoKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & SyntaxNode;

export const gotoStatementPrinter: Printer['print'] = (path, _, print) => {
  const { caseOrDefaultKeyword }: GotoStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    'goto ',
    caseOrDefaultKeyword.text &&
      (caseOrDefaultKeyword.text === 'default'
        ? caseOrDefaultKeyword.text
        : `${caseOrDefaultKeyword.text} `),
    path.call(print, 'expression'),
    ';',
  ]);
};
