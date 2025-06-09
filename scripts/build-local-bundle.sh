NODE_ENV=production pnpm --filter=@fern-docs/bundle docs:build:local
cp -r packages/fern-docs/bundle/.next/static packages/fern-docs/bundle/.next/standalone/packages/fern-docs/bundle/.next
find packages/fern-docs/bundle/.next -depth -mindepth 1 -not -path "packages/fern-docs/bundle/.next/standalone*" -exec rm -rf {} \;
tar -czf docs_bundle.tar.gz -C packages/fern-docs/bundle/.next/standalone .
