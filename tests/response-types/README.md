## About

This folder contains a server that can be used to mock endpoints of a variety response types.

## Usage

First, start up the server:

```
node server.js
```

Then, run the site in local development mode:

```
fern docs dev
```

If you want to try this out using local changes made to `fern-platform`:

1. Update the `.env.local` file to reference `https://response-types.docs.buildwithfern.com`
2. Build local development mode: `pnpm --filter=@fern-docs/bundle pnpm docs:make:local`
3. Start local development mode: `pnpm --filter=@fern-docs/bundle pnpm docs:start:local`

## Possible Next Steps

We could host and subsequently integrate this server into our existing CI/CD process.
