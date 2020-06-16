const { format } = require('prettier');

export const code = (strings: TemplateStringsArray) => {
  const rawString = strings.raw[0];
  const lines = rawString.split('\n');
  
  // remove leading whitespace
  lines.shift();

  const firstNonWhiteSpacePosition = lines[0].match(/\S/)?.index;
  return lines.map((line) => line.slice(firstNonWhiteSpacePosition)).join('\n');
};

export const formatCSharpWithPrettier = (text: string) =>
  format(text, {
    parser: 'csharp',
    plugins: ['.'],
  });
