import { createCohereSystemPrompt } from "../../utils/cohere-system-prompt";
import { createDefaultSystemPrompt } from "../../utils/system-prompt";
import { CustomAskFernConfig } from "../custom/types";

export function createChatSystemPrompt({
  customConfig,
  domain,
  date,
  documents,
  promptTemplate,
}: {
  customConfig: CustomAskFernConfig;
  domain: string;
  date: string;
  documents: string;
  promptTemplate?: string;
}) {
  return customConfig.isCohere
    ? createCohereSystemPrompt({
        domain,
        date,
        documents,
        promptTemplate,
      })
    : createDefaultSystemPrompt({
        domain,
        date,
        documents,
        promptTemplate,
      });
}
