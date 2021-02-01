import { StatementNode, SyntaxNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { printAttributeLists } from '../../helpers/printerHelpers';
import hardline = doc.builders.hardline;
import indent = doc.builders.indent;

export type LabeledStatementNode = {
  attributeLists: Array<AttributeListNode>;
  colonToken: SyntaxToken;
  identifier: SyntaxToken;
  statement: StatementNode;
} & SyntaxNode;

export const labeledStatementPrinter: Printer<LabeledStatementNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    printAttributeLists(path, print),
    path.call(print, 'identifier'),
    path.call(print, 'colonToken'),
    indent(concat([hardline, path.call(print, 'statement')])),
  ]);
