import { format } from 'prettier';

export const code = (strings: TemplateStringsArray) => {
  const rawString = strings.raw[0];
  const lines = rawString.split('\n');

  // remove leading whitespace
  lines.shift();

  const firstNonWhiteSpaceCharacterPosition = lines[0].match(/\S/)?.index;
  return lines
    .map((line) => line.slice(firstNonWhiteSpaceCharacterPosition))
    .join('\n');
};

export const formatCSharpWithPrettier = (text: string) =>
  format(text, {
    //@ts-ignore
    parser: 'roslyn-csharp',
    plugins: ['.'],
  });
