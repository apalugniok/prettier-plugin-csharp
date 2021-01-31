import { doc, Printer } from 'prettier';
import {
  DiscardDesignationNode,
  ParenthesizedVariableDesignationNode,
  SingleVariableDesignationNode,
} from '../other/designation';
import concat = doc.builders.concat;
import { SyntaxToken } from '../syntaxToken';
import { SyntaxNode } from '../syntaxNode';

export type VarPatternNode = {
  varKeyword: SyntaxToken;
  designation:
    | SingleVariableDesignationNode
    | DiscardDesignationNode
    | ParenthesizedVariableDesignationNode;
} & SyntaxNode;

export const varPatternPrinter: Printer<VarPatternNode>['print'] = (
  path,
  _,
  print
) =>
  concat([
    path.call(print, 'varKeyword'),
    ' ',
    path.call(print, 'designation'),
  ]);
