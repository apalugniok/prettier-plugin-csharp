import { spawnSync } from 'child_process';
import path from 'path';

const getAbsolutePath = (relativePath: string) =>
  path.join(__dirname, relativePath);

export const parse = (text: string) => {
  const rosylnParserDllPath =
    process.env.NODE_ENV === 'production'
      ? getAbsolutePath('./Parser/PrettierCSharpPlugin.dll')
      : getAbsolutePath(
          '../bin/Release/netcoreapp3.1/publish/PrettierCSharpPlugin.dll'
        );

  const child = spawnSync('dotnet', [rosylnParserDllPath], {
    input: text,
    maxBuffer: 10 * 1024 * 1024 /* 10MB */,
  });

  const error = child.stderr.toString();
  if (error) {
    throw new Error(error);
  }

  const response = child.stdout.toString();
  return JSON.parse(response);
};
