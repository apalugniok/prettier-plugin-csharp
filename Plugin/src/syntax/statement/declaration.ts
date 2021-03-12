import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';
import { SyntaxToken } from '../syntaxToken';
import { VariableDeclarationNode } from '../declaration/variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { AttributeListNode } from '../declaration/attribute';
import group = doc.builders.group;
import { StatementNode, SyntaxNode } from '../syntaxNode';

export type LocalDeclarationStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  declaration: VariableDeclarationNode;
  isConst: boolean;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
  usingKeyword: SyntaxToken;
} & StatementNode;

export const localDeclarationStatementPrinter: Printer<LocalDeclarationStatementNode>['print'] = (
  path,
  _,
  print
) => {
  const { awaitKeyword, usingKeyword } = path.getValue();

  return concat([
    printLeadingNewLine(path),
    printAttributeLists(path, print),
    group(
      concat([
        printModifiers(path, print),
        path.call(print, 'usingKeyword'),
        usingKeyword.text !== '' ? ' ' : '',
        path.call(print, 'awaitKeyword'),
        awaitKeyword.text !== '' ? ' ' : '',
        path.call(print, 'declaration'),
        path.call(print, 'semicolonToken'),
      ])
    ),
  ]);
};
