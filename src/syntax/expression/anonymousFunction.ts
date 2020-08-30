import { SyntaxToken } from '../syntaxToken';
import { BlockNode } from '../statement/block';
import { ParameterListNode, ParameterNode } from '../declaration/parameter';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { Doc, doc, FastPath, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;
import join = doc.builders.join;
import line = doc.builders.line;

export type AnonymousMethodExpressionNode = {
  asyncKeyword: SyntaxToken;
  block: BlockNode;
  delegateKeyword: SyntaxToken;
  // Anonymous methods cannot have expression bodies even though ExpressionBody exists on Roslyn's AnonymousMethodExpressionSyntax class
  // see https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/expressions#anonymous-function-expressions
  expressionBody: null;
  parameterList: ParameterListNode;
} & SyntaxNode;

export const anonymousMethodExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const { asyncKeyword }: AnonymousMethodExpressionNode = path.getValue();

  return group(
    concat([
      asyncKeyword.text !== ''
        ? join(' ', [asyncKeyword.text, 'delegate'])
        : 'delegate',
      ' ',
      path.call(print, 'parameterList'),
      line,
      path.call(print, 'block'),
    ])
  );
};

const printLambdaBody = (
  path: FastPath,
  print: (path: FastPath) => Doc,
  body: BlockNode | null,
  expressionBody: ExpressionNode
): Doc =>
  body != null
    ? path.call(print, 'block')
    : expressionBody != null
    ? path.call(print, 'expressionBody')
    : '';

export type SimpleLambdaExpressionNode = {
  arrowToken: SyntaxToken;
  asyncKeyword: SyntaxToken;
  block: BlockNode;
  expressionBody: ExpressionNode;
  parameter: ParameterNode;
} & SyntaxNode;

export const simpleLambdaExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    asyncKeyword,
    block,
    expressionBody,
  }: SimpleLambdaExpressionNode = path.getValue();

  return group(
    concat([
      asyncKeyword.text !== '' ? concat([asyncKeyword.text, ' ']) : '',
      path.call(print, 'parameter'),
      ' ',
      '=>',
      ' ',
      printLambdaBody(path, print, block, expressionBody),
    ])
  );
};

export type ParenthesizedLambdaExpressionSyntax = {
  arrowToken: SyntaxToken;
  asyncKeyword: SyntaxToken;
  block: BlockNode;
  expressionBody: ExpressionNode;
  parameterList: ParameterListNode;
} & SyntaxNode;

export const parenthesizedLambdaExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    asyncKeyword,
    block,
    expressionBody,
  }: ParenthesizedLambdaExpressionSyntax = path.getValue();

  return group(
    concat([
      asyncKeyword.text !== '' ? concat([asyncKeyword.text, ' ']) : '',
      path.call(print, 'parameterList'),
      ' ',
      '=>',
      ' ',
      printLambdaBody(path, print, block, expressionBody),
    ])
  );
};
