import { SyntaxToken } from '../syntaxToken';
import { BlockNode } from '../statement/block';
import { ParameterListNode, ParameterNode } from '../declaration/parameter';
import { ExpressionNode, SyntaxNode } from '../syntaxNode';
import { Doc, doc, FastPath, Printer } from 'prettier';
import concat = doc.builders.concat;
import group = doc.builders.group;
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

export const anonymousMethodExpressionPrinter: Printer<AnonymousMethodExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  const { asyncKeyword } = path.getValue();

  return group(
    concat([
      path.call(print, 'asyncKeyword'),
      asyncKeyword.text !== '' ? ' ' : '',
      path.call(print, 'delegateKeyword'),
      ' ',
      path.call(print, 'parameterList'),
      line,
      path.call(print, 'block'),
    ])
  );
};

export type SimpleLambdaExpressionNode = {
  arrowToken: SyntaxToken;
  asyncKeyword: SyntaxToken;
  block: BlockNode;
  expressionBody: ExpressionNode;
  parameter: ParameterNode;
} & SyntaxNode;

export const simpleLambdaExpressionPrinter: Printer<SimpleLambdaExpressionNode>['print'] = (
  path,
  _,
  print
) => {
  const { asyncKeyword } = path.getValue();

  return group(
    concat([
      path.call(print, 'asyncKeyword'),
      asyncKeyword.text !== '' ? ' ' : '',
      path.call(print, 'parameter'),
      ' ',
      path.call(print, 'arrowToken'),
      ' ',
      printLambdaBody(path, print),
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

export const parenthesizedLambdaExpressionPrinter: Printer<ParenthesizedLambdaExpressionSyntax>['print'] = (
  path,
  _,
  print
) => {
  const { asyncKeyword } = path.getValue();

  return group(
    concat([
      path.call(print, 'asyncKeyword'),
      asyncKeyword.text !== '' ? ' ' : '',
      path.call(print, 'parameterList'),
      ' ',
      path.call(print, 'arrowToken'),
      ' ',
      printLambdaBody(path, print),
    ])
  );
};

const printLambdaBody = <
  TNode extends { block: BlockNode; expressionBody: ExpressionNode }
>(
  path: FastPath<TNode>,
  print: (path: FastPath) => Doc
): Doc => {
  const { block, expressionBody } = path.getValue();

  return block != null
    ? group(path.call(print, 'block'))
    : expressionBody != null
    ? path.call(print, 'expressionBody')
    : '';
};
