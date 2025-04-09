-- AlterTable
ALTER TABLE "DocsV2" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

UPDATE "DocsV2"
SET "isArchived" = true
WHERE "updatedTime" < NOW() - INTERVAL '6 months';