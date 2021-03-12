import { doc, Printer } from 'prettier';
import { DeclarationNode, StatementNode } from '../syntaxNode';
import concat = doc.builders.concat;
import { SyntaxToken } from '../syntaxToken';
import { AttributeListNode } from './attribute';
import {
  printAttributeLists,
  printLeadingNewLine,
  printModifiers,
} from '../../helpers/printerHelpers';
import group = doc.builders.group;

export type GlobalStatementNode = {
  attributeLists: Array<AttributeListNode>;
  modifiers: Array<SyntaxToken>;
  statement: StatementNode;
} & DeclarationNode;

export const globalStatementPrinter: Printer<GlobalStatementNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      printModifiers(path, print),
      path.call(print, 'statement'),
    ])
  );
