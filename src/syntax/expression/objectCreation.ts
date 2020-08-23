import { SyntaxToken } from '../syntaxToken';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import { ArgumentListNode } from './argument';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import { InitializerExpressionNode } from './initializer';

export type ObjectCreationExpressionNode = {
  newKeyword: SyntaxToken;
  type: TypeNode;
  argumentList: ArgumentListNode | null;
  initializer: InitializerExpressionNode | null;
} & SyntaxNode;

export const objectCreationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  const {
    argumentList,
    initializer,
  }: ObjectCreationExpressionNode = path.getValue();

  const shouldShowArgumentsList =
    (argumentList?.arguments?.length ?? 0) > 0 || initializer == null;

  return concat([
    'new ',
    path.call(print, 'type'),
    shouldShowArgumentsList ? path.call(print, 'argumentList') : '',
    path.call(print, 'initializer'),
  ]);
};
