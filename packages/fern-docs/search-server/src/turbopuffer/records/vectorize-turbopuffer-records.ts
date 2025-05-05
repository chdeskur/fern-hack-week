import { zipWith } from "es-toolkit/array";
import { encode } from "gpt-tokenizer";

import { TurbopufferRecord, TurbopufferRecordWithoutVector } from "../types";

export async function vectorizeTurbopufferRecords(
  records: TurbopufferRecordWithoutVector[],
  vectorizer: (chunk: string[]) => Promise<number[][]>
): Promise<TurbopufferRecord[]> {
  // TODO: debug what records are being filtered out here
  records = records.filter(
    (record) =>
      encode(record.attributes.chunk).length <= 8190 &&
      encode(record.attributes.chunk).length > 0
  );
  const chunks = records.map((record) => record.attributes.chunk);
  const vectors = await vectorizer(chunks);
  return zipWith(records, vectors, (record, vector) => ({
    ...record,
    vector,
  }));
}
