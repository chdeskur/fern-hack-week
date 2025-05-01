import { zipWith } from "es-toolkit/array";
import { encode } from "gpt-tokenizer";

import { TurbopufferRecord, TurbopufferRecordWithoutVector } from "../types";

export async function vectorizeTurbopufferRecords(
  records: TurbopufferRecordWithoutVector[],
  vectorizer: (chunk: string[]) => Promise<number[][]>
): Promise<TurbopufferRecord[]> {
  let chunks = records.map((record) => record.attributes.chunk);
  chunks = chunks.filter(
    (c) => encode(c).length <= 8190 && encode(c).length > 0
  );
  const vectors = await vectorizer(chunks);
  return zipWith(records, vectors, (record, vector) => ({
    ...record,
    vector,
  }));
}
