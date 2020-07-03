import { StatementNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { doc, Printer } from 'prettier';
import hardline = doc.builders.hardline;
import join = doc.builders.join;
import concat = doc.builders.concat;
import indent = doc.builders.indent;

export type BlockNode = {
  attributeLists: Array<AttributeListNode>;
  statements: Array<StatementNode>;
} & StatementNode;

export const blockPrinter: Printer['print'] = (path, _, print) => {
  const { statements }: BlockNode = path.getValue();

  const block =
    statements.length !== 0
      ? concat([
          join(hardline, [...path.map(print, 'attributeLists'), '']),
          '{',
          indent(
            concat([hardline, join(hardline, path.map(print, 'statements'))])
          ),
          hardline,
          '}',
        ])
      : concat([
          join(hardline, [...path.map(print, 'attributeLists'), '']),
          '{}',
        ]);

  return concat([
    join(hardline, [...path.map(print, 'attributeLists'), '']),
    block,
  ]);
};
