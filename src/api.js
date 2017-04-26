import lex from 'pug-lexer';
import parse from 'pug-parser';
import wrap from 'pug-runtime/wrap';
import generateCode from 'pug-code-gen';

export function compilePugTemplate(str = '', locals = {}) {
  try {
    let funcStr = generateCode(parse(lex(str)), {
      compileDebug: false,
      pretty: true,
      inlineRuntimeFunctions: false,
      templateName: '_parse'
    });
    let func = wrap(funcStr, '_parse');
    return func(locals);
  } catch (e) {
    return `Compile Error: ${e.message}`;
  }
}
