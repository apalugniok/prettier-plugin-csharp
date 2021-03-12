import { StatementNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import {
  printAttributeLists,
  printLeadingNewLine,
} from '../../helpers/printerHelpers';
import concat = doc.builders.concat;
import group = doc.builders.group;

export type BreakStatementNode = {
  attributeLists: Array<AttributeListNode>;
  breakKeyword: SyntaxToken;
  semicolonToken: SyntaxToken;
} & StatementNode;

export const breakStatementPrinter: Printer<BreakStatementNode>['print'] = (
  path,
  _,
  print
) =>
  group(
    concat([
      printLeadingNewLine(path),
      printAttributeLists(path, print),
      path.call(print, 'breakKeyword'),
      path.call(print, 'semicolonToken'),
    ])
  );
