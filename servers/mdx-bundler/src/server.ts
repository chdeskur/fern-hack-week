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
curl -X POST \
  http://localhost:8080/serialize \
  -H "Content-Type: application/json" \
  -d '{"code":"```ts twoslash\nconst hi = "Hello";\nconst msg = `${hi}, world`;\n//    ^?\n```"}'
*/
