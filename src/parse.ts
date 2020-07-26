import { spawnSync } from 'child_process';
import path from 'path';

const getAbsolutePath = (relativePath: string) =>
  path.join(__dirname, relativePath);

export const parse = (text: string) => {
  const rosylnParserExecutablePath =
    process.env.NODE_ENV === 'production'
      ? getAbsolutePath('./Parser/PrettierCSharpPlugin.exe')
      : getAbsolutePath('../bin/Debug/netcoreapp3.1/PrettierCSharpPlugin.exe');

  const child = spawnSync(rosylnParserExecutablePath, [], {
    input: text,
    maxBuffer: 10 * 1024 * 1024 /* 10MB */,
  });

  const error = child.stderr.toString();
  if (error) {
    throw new Error(error);
  }

  const response = child.stdout.toString();
  console.log(JSON.parse(response));
  return JSON.parse(response);
};
