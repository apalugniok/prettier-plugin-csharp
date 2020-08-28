import { SyntaxToken } from '../syntaxToken';
import { Printer } from 'prettier';
import { SyntaxNode } from '../syntaxNode';

export type DiscardPatternNode = {
  underscoreToken: SyntaxToken;
} & SyntaxNode;

export const discardPatternPrinter: Printer['print'] = (path) =>
  (path.getValue() as DiscardPatternNode).underscoreToken.text;
