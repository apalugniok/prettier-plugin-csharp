import { SyntaxNode, TypeNode } from '../syntaxNode';
import { doc, Printer } from 'prettier';
import concat = doc.builders.concat;
import {
  DiscardDesignationNode,
  ParenthesizedVariableDesignationNode,
  SingleVariableDesignationNode,
} from '../other/designation';

export type DeclarationExpressionNode = {
  type: TypeNode;
  designation:
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode;
} & SyntaxNode;

export const declarationExpressionPrinter: Printer['print'] = (
  path,
  _,
  print
) => {
  return concat([
    path.call(print, 'type'),
    ' ',
    path.call(print, 'designation'),
  ]);
};
