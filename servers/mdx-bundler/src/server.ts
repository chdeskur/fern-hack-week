import cors from "cors";
import express, { Request, Response } from "express";

import { serializeTwoslash } from "./serialize";

const expressApp = express();

expressApp.use(cors());
expressApp.use(express.json());

// serializes codeblocks using shiki + twoslash
expressApp.post("/serialize", (req: Request, res: Response) => {
  if (!req.body.code) {
    return res.status(400).json({ error: "No code provided" });
  }

  serializeTwoslash(req.body.code)
    .then((result) => {
      if (!result) {
        return res.status(400).json({ error: "Failed to serialize MDX" });
      }
      return res.json(result);
    })
    .catch((error: unknown) => {
      console.error("Error serializing MDX:", error);
      return res.status(500).json({ error: "Failed to serialize MDX" });
    });
});

expressApp.all("*", (_req: Request, res: Response) => {
  res.sendStatus(200);
});

expressApp.listen(8080);

/*
curl -X POST http://localhost:8080/serialize -H "Content-Type: application/json" -d '{"code":"```ts twoslash\nimport { LocalAccountSigner } from \"@aa-sdk/core\";\nimport {\n  alchemy,\n  createAlchemySmartAccountClient,\n  sepolia,\n} from \"@account-kit/infra\";\nimport { createLightAccount } from \"@account-kit/smart-contracts\";\nimport { http } from \"viem\";\nimport { generatePrivateKey } from \"viem/accounts\";\n\n// with account hoisting\nconst transport = alchemy({ apiKey: \"your-api-key\" });\nconst hoistedClient = createAlchemySmartAccountClient({\n  transport,\n  chain: sepolia,\n  account: await createLightAccount({\n    signer: LocalAccountSigner.privateKeyToAccountSigner(generatePrivateKey()),\n    chain: sepolia,\n    transport,\n  }),\n});\n\nconst signature = await hoistedClient.signMessage({ message: \"Hello world! \" });\n\n// without account hoisting\nconst nonHoistedClient = createAlchemySmartAccountClient({\n  transport,\n  chain: sepolia,\n});\n\nconst lightAccount = await createLightAccount({\n  signer: LocalAccountSigner.privateKeyToAccountSigner(generatePrivateKey()),\n  chain: sepolia,\n  transport,\n});\n\nconst signature2 = await nonHoistedClient.signMessage({\n  message: \"Hello world! \",\n  account: lightAccount,\n});\n```"}'
*/
