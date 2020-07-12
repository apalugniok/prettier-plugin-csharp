import { StatementNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { doc, Printer } from 'prettier';
import hardline = doc.builders.hardline;
import join = doc.builders.join;
import concat = doc.builders.concat;
import indent = doc.builders.indent;
import { SyntaxToken } from '../syntaxToken';

export type BlockNode = {
  attributeLists: Array<AttributeListNode>;
  closeBraceToken: SyntaxToken;
  openBraceToken: SyntaxToken;
  statements: Array<StatementNode>;
} & StatementNode;

export const blockPrinter: Printer['print'] = (path, _, print) => {
  const { statements }: BlockNode = path.getValue();

  const block =
    statements.length !== 0
      ? concat([
          '{',
          indent(
            concat([hardline, join(hardline, path.map(print, 'statements'))])
          ),
          hardline,
          '}',
        ])
      : '{ }';

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    block,
  ]);
};
