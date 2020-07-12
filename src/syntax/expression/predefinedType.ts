import { Printer } from 'prettier';
import { SyntaxNode } from '../syntaxNode';
import { SyntaxToken } from '../syntaxToken';

export type PredefinedTypeNode = {
  keyword: SyntaxToken;
} & SyntaxNode;

export const predefinedTypePrinter: Printer['print'] = (path) => {
  const { keyword }: PredefinedTypeNode = path.getValue();

  return keyword.text;
};
