import { SyntaxNode, TypeNode } from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { BlockNode } from './block';
import { TypeParameterConstraintClauseNode } from '../declaration/typeParameterConstraint';
import { ArrowExpressionClauseNode } from '../expression/arrowExpressionClause';
import { SyntaxToken } from '../syntaxToken';
import {
  ParameterListNode,
  TypeParameterListNode,
} from '../declaration/parameter';
import { doc, Printer } from 'prettier';
import {
  printAttributeLists,
  printMethodBody,
  printModifiers,
} from '../../helpers/printerHelpers';
import indent = doc.builders.indent;
import line = doc.builders.line;
import concat = doc.builders.concat;
import join = doc.builders.join;
import group = doc.builders.group;

export type LocalFunctionStatementNode = {
  attributeLists: Array<AttributeListNode>;
  body: BlockNode | null;
  constraintClauses: Array<TypeParameterConstraintClauseNode>;
  expressionBody: ArrowExpressionClauseNode | null;
  identifier: SyntaxToken;
  modifiers: Array<SyntaxToken>;
  parameterList: ParameterListNode;
  returnType: TypeNode;
  semicolonToken: SyntaxToken;
  typeParameterList: TypeParameterListNode;
} & SyntaxNode;

export const localFunctionStatementPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    constraintClauses,
    body,
    expressionBody,
    identifier,
    modifiers,
  }: LocalFunctionStatementNode = path.getValue();

  return concat([
    printAttributeLists(path, print),
    printModifiers(modifiers),
    path.call(print, 'returnType'),
    ' ',
    identifier.text,
    path.call(print, 'typeParameterList'),
    path.call(print, 'parameterList'),
    constraintClauses.length !== 0
      ? group(
          indent(
            concat([line, join(line, path.map(print, 'constraintClauses'))])
          )
        )
      : '',
    printMethodBody(path, print, body, expressionBody),
    body == null && expressionBody == null ? ';' : '',
  ]);
};
