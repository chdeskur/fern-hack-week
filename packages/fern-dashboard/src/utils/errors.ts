// Extend the Error type to include the digest property
interface DigestibleError extends Error {
  digest: string;
}

export type ERROR_DIGEST_KEYS =
  | "BRANCH_NOT_FOUND"
  | "BASE_BRANCH_NOT_SET"
  | "SOURCE_REPO_NOT_FOUND";

export const ERROR_DIGEST_MESSAGES: Record<ERROR_DIGEST_KEYS, string> = {
  BRANCH_NOT_FOUND:
    "We were unable to find your working branch. Please confirm that the Github branch exists and has not been deleted.",
  BASE_BRANCH_NOT_SET:
    "Looks like your source repo is not configured correctly. Please set a base branch on your Github repo.",
  SOURCE_REPO_NOT_FOUND:
    "We were unable to find the source repo for this domain. Please confirm that you have linked a repo to this domain.",
};

export const throwDigestibleError = (
  message: string,
  digest: string
): never => {
  const error = new Error(message) as DigestibleError;
  error.digest = digest;
  throw error;
};
