import pkg from './package.json' with { type: 'json' };
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { globSync } from 'glob';

export default /** @type import('electron-builder').Configuration */
  ({
    directories: { output: 'dist' },
    asarUnpack: [
      "node_modules/@dbmate/**",
      "node_modules/@app/main/dist/migrations/**",
    ],
    linux: { target: ['AppImage'] },
    artifactName: '${productName}-${version}-${os}-${arch}.${ext}',
    generateUpdatesFilesForAllChannels: true,
    files: [
      'LICENSE*',
      pkg.main,
      ...await getListOfFilesFromEachWorkspace(),
    ],
  });

async function getListOfFilesFromEachWorkspace() {
  const workspacePatterns = pkg.workspaces || [];
  const allFilesToInclude = [];

  for (const pattern of workspacePatterns) {
    const pkgJsonPaths = globSync(`${pattern}/package.json`, { cwd: process.cwd() });

    for (const pkgJsonPath of pkgJsonPaths) {
      const { default: workspacePkg } = await import(
        pathToFileURL(join(process.cwd(), pkgJsonPath)),
        { with: { type: 'json' } }
      );

      let patterns = workspacePkg.files || ['dist/**', 'package.json'];
      patterns = patterns.map(p => join('node_modules', workspacePkg.name, p));
      allFilesToInclude.push(...patterns);
    }
  }

  return allFilesToInclude;
}
