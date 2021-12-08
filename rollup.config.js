import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild'
import { terser } from 'rollup-plugin-terser'

export default {
  input: `src/index.ts`,
  output: {
    file: './dist/index.es.js',
    format: 'es',
    sourcemap: 'hidden',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015'
    }),
    terser() // 压缩代码
  ]
}