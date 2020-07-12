import { SyntaxTrivia } from './syntaxTrivia';

export type SyntaxToken = {
  text: string;
  kind: string;
  leadingTrivia: Array<SyntaxTrivia>;
  trailingTrivia: Array<SyntaxTrivia>;
};
