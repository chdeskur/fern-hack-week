import { RecordIr } from "./RecordIr";

export type BaseRecordIr = Omit<RecordIr, "attributes"> & {
  attributes: Omit<RecordIr["attributes"], "chunk">;
};
