npx rollup -c &&
mv dist/index.js dist/index.es.js &&
rm -rf dist/*.js.map

# not types 
# npx rollup -c &&
# mkdir dist/es &&
# mv dist/index.js dist/es/index.js && 
# mv dist/dist/index.d.ts dist &&
# mkdir dist/umd &&
# mv dist/index.umd.js dist/umd/index.js &&
# rm -rf dist/dist dist/index.js.map