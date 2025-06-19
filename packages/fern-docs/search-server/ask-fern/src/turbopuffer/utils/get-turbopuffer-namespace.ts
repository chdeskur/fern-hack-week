import { EmbeddingModel } from "ai";

export function getTurbopufferNamespace(
  domain: string,
  embeddingModel: EmbeddingModel<string>
): string {
  return `${domain}_${embeddingModel.modelId}_v2`;
}
