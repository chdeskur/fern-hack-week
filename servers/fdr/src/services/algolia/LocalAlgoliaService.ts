import { APIV1Db, DocsV1Db } from "@fern-api/fdr-sdk";

import { AlgoliaService } from "./AlgoliaService";
import { AlgoliaSearchRecord, ConfigSegmentTuple } from "./types";

export class LocalAlgoliaServiceImpl implements AlgoliaService {
  async deleteIndexSegmentRecords(indexSegmentIds: string[]): Promise<void> {
    return;
  }
  async generateSearchRecords(params: {
    url: string;
    docsDefinition: DocsV1Db.DocsDefinitionDb;
    apiDefinitionsById: Record<string, APIV1Db.DbApiDefinition>;
    configSegmentTuples: ConfigSegmentTuple[];
  }): Promise<AlgoliaSearchRecord[]> {
    return [];
  }
  async uploadSearchRecords(records: AlgoliaSearchRecord[]): Promise<void> {
    return;
  }
  generateSearchApiKey(filters: string, validUntil: Date): string {
    return "";
  }
}
