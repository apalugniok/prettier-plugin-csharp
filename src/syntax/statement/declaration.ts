import {
  printAttributeLists,
  printModifiers,
} from '../../helpers/printerHelpers';
import { SyntaxToken } from '../syntaxToken';
import { VariableDeclarationNode } from '../declaration/variable';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { AttributeListNode } from '../declaration/attribute';
import group = doc.builders.group;
import { SyntaxNode } from '../syntaxNode';

export type LocalDeclarationStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  declaration: VariableDeclarationNode;
  isConst: boolean;
  modifiers: Array<SyntaxToken>;
  semicolonToken: SyntaxToken;
  usingKeyword: SyntaxToken;
} & SyntaxNode;

export const localDeclarationStatementPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    awaitKeyword,
    modifiers,
    usingKeyword,
  }: LocalDeclarationStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    group(
      concat([
        printModifiers(modifiers),
        usingKeyword.text === '' ? '' : `${usingKeyword.text} `,
        awaitKeyword.text === '' ? '' : `${awaitKeyword.text} `,
        path.call(print, 'declaration'),
        ';',
      ])
    ),
  ]);
};
