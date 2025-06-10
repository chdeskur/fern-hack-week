NODE_ENV=production pnpm --filter=@fern-docs/bundle docs:build:selfhosted
cp -r packages/fern-docs/bundle/.next/static packages/fern-docs/bundle/.next/standalone/packages/fern-docs/bundle/.next
find packages/fern-docs/bundle/.next -depth -mindepth 1 -not -path "packages/fern-docs/bundle/.next/standalone*" -exec rm -rf {} \;
rm -rf packages/fern-docs/bundle/.next/standalone/node_modules/.pnpm/esbuild@0.25.0 && rm -rf packages/fern-docs/bundle/.next/standalone/node_modules/.pnpm/@esbuild+linux-x64@0.25.0
tar -czf docs_bundle.tar.gz -C packages/fern-docs/bundle/.next/standalone .
