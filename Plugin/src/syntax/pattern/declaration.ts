import { doc, Printer } from 'prettier';
import { SyntaxNode, TypeNode } from '../syntaxNode';
import {
  DiscardDesignationNode,
  ParenthesizedVariableDesignationNode,
  SingleVariableDesignationNode,
} from '../other/designation';
import concat = doc.builders.concat;

export type DeclarationPatternNode = {
  type: TypeNode;
  designation:
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode;
} & SyntaxNode;

export const declarationPatternPrinter: Printer<DeclarationPatternNode>['print'] = (
  path,
  _,
  print
) => concat([path.call(print, 'type'), ' ', path.call(print, 'designation')]);
