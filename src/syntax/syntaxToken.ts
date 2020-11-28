import { SyntaxTrivia } from './syntaxTrivia';
import { Printer } from 'prettier';

export type SyntaxToken = {
  nodeType: 'Token';
  text: string;
  kind: string;
  leadingTrivia: Array<SyntaxTrivia>;
  trailingTrivia: Array<SyntaxTrivia>;
};

export const tokenPrinter: Printer['print'] = (path, _, print) => {
  const { text }: SyntaxToken = path.getValue();

  return text;
};
