import { spawnSync } from 'child_process';
import path from 'path';

export const parse = (text: string) => {
  const rosylnParserExecutablePath =
    process.env.NODE_ENV === 'production'
      ? '' //todo
      : path.join(
          __dirname,
          '../bin/Debug/netcoreapp3.1/PrettierCSharpPlugin.exe'
        );

  const child = spawnSync(rosylnParserExecutablePath, [], {
    input: text,
    maxBuffer: 10 * 1024 * 1024 /* 10MB */,
  });

  const error = child.stderr.toString();
  if (error) {
    throw new Error(error);
  }

  const response = child.stdout.toString();
  console.log(response);
  return JSON.parse(response);
};
