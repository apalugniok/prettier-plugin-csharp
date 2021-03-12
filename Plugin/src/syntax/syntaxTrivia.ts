export type SyntaxTrivia = {
  triviaType: SyntaxTriviaType;
  start: number;
  end: number;
  text: string;
};

export type SyntaxTriviaType =
  | CommentTriviaType
  | 'EndOfLine'
  | 'Whitespace'
  | 'DocumentationCommentExterior'
  | 'DisabledText'
  | 'PreprocessingMessage'
  | 'IfDirective'
  | 'ElifDirective'
  | 'ElseDirective'
  | 'EndIfDirective'
  | 'RegionDirective'
  | 'EndRegionDirective'
  | 'DefineDirective'
  | 'UndefDirective'
  | 'ErrorDirective'
  | 'WarningDirective'
  | 'LineDirective'
  | 'PragmaWarningDirective'
  | 'PragmaChecksumDirective'
  | 'ReferenceDirective'
  | 'BadDirective'
  | 'SkippedTokens'
  | 'ConflictMarker'
  | 'ShebangDirective'
  | 'LoadDirective'
  | 'NullableDirective';

export const commentTriviaTypes = [
  'SingleLineComment',
  'MultiLineComment',
  'SingleLineDocumentationComment',
  'MultiLineDocumentationComment',
] as const;

export type CommentTriviaType = typeof commentTriviaTypes[number];

export type CommentTrivia = SyntaxTrivia & { triviaType: CommentTriviaType };

export const isComment = (trivia: SyntaxTrivia): trivia is CommentTrivia =>
  // @ts-ignore
  commentTriviaTypes.includes(trivia.triviaType);
