directory="dist"

if [ -d "$directory" ]; then
  rm -r "$directory"
fi

npx rollup -c rollup.config.ts --environment ESM --configPlugin @rollup/plugin-typescript
npx rollup -c rollup.config.ts --configPlugin @rollup/plugin-typescript