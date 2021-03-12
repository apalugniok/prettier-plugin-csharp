import { StatementNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { doc, Printer } from 'prettier';
import join = doc.builders.join;
import concat = doc.builders.concat;
import indent = doc.builders.indent;
import { SyntaxToken } from '../syntaxToken';
import { printAttributeLists } from '../../helpers/printerHelpers';
import { builders } from 'prettier/doc';
import line = builders.line;
import group = doc.builders.group;

export type BlockNode = {
  attributeLists: Array<AttributeListNode>;
  closeBraceToken: SyntaxToken;
  openBraceToken: SyntaxToken;
  statements: Array<StatementNode>;
} & StatementNode;

const parentNodesForWhichBlockGroupIsAlwaysBroken = [
  'TryStatement',
  'IfStatement',
  'ElseClause',
  'ForStatement',
  'ForEachStatement',
  'MethodDeclaration',
  'ConstructorDeclaration',
  'DestructorDeclaration',
  'OperatorDeclaration',
  'ConversionOperatorDeclaration',
  'BlockStatement',
  'UnsafeStatement',
  'CheckedStatement',
  'FixedStatement',
  'WhileStatement',
  'LockStatement',
  'CatchClause',
  'DoStatement',
  'UsingStatement',
  'LocalFunctionStatement',
];

export const blockPrinter: Printer<BlockNode>['print'] = (path, _, print) => {
  const { statements } = path.getValue();

  const shouldBreak = parentNodesForWhichBlockGroupIsAlwaysBroken.includes(
    // @ts-ignore
    path.getParentNode()?.nodeType
  );

  const block =
    statements.length !== 0
      ? group(
          concat([
            path.call(print, 'openBraceToken'),
            indent(concat([line, join(line, path.map(print, 'statements'))])),
            line,
            path.call(print, 'closeBraceToken'),
          ]),
          {
            shouldBreak,
          }
        )
      : concat([
          path.call(print, 'openBraceToken'),
          ' ',
          path.call(print, 'closeBraceToken'),
        ]);

  return concat([printAttributeLists(path, print), block]);
};
