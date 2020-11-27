import {
  ExpressionNode,
  StatementNode,
  SyntaxNode,
  TypeNode,
} from '../syntaxNode';
import { AttributeListNode } from '../declaration/attribute';
import { SyntaxToken } from '../syntaxToken';

export type ForEachStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  forEachKeyword: SyntaxToken;
  identifier: SyntaxToken;
  inKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  type: TypeNode;
} & SyntaxNode;

export type ForEachVariableStatementNode = {
  attributeLists: Array<AttributeListNode>;
  awaitKeyword: SyntaxToken;
  closeParenToken: SyntaxToken;
  expression: ExpressionNode;
  forEachKeyword: SyntaxToken;
  inKeyword: SyntaxToken;
  openParenToken: SyntaxToken;
  statement: StatementNode;
  variable: ExpressionNode;
} & SyntaxNode;
