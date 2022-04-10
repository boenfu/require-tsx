import {Module as NodeModule} from 'module';

import {transform} from 'sucrase';

const Module = NodeModule as typeof NodeModule & {
  _extensions: Record<
    string,
    (module: typeof NodeModule, filename: string) => void
  >;
  prototype: {
    _compile(content: string, fileName: string): any;
  };
};

const extraExtensions: Record<string, ContentCompiler> = {};

let compileOverlaid = false;

export type ContentCompiler = (content: string, fileName: string) => string;

export function inject(extensions: Record<string, ContentCompiler>): void {
  if (!compileOverlaid) {
    compileOverlaid = true;
    overlayCompile();
  }

  for (let extension in extensions) {
    Module._extensions[extension] = Module._extensions['.js'];
  }

  Object.assign(extraExtensions, extensions);
}

function overlayCompile(): void {
  const _compile = Module.prototype._compile;

  Module.prototype._compile = function (content, fileName) {
    for (let extension in extraExtensions) {
      if (fileName.endsWith(extension)) {
        content = extraExtensions[extension](content, fileName);
        break;
      }
    }

    return _compile.call(this, content, fileName);
  };
}

export function defaultContentCompiler(
  content: string,
  fileName: string,
): string {
  return transform(content, {
    transforms: ['typescript', 'imports', 'jsx'],
    production: true,
    enableLegacyBabel5ModuleInterop: true,
    filePath: fileName,
  }).code;
}

export const sucraseTransform = transform;

export default inject({
  '.ts': defaultContentCompiler,
  '.jsx': defaultContentCompiler,
  '.tsx': defaultContentCompiler,
});
