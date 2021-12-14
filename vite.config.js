const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'emitter',
      formats: ['es', 'umd'], // default：['es', 'umd']
      fileName: (format) => `index.${format}.js`
    }
  }
})