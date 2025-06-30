export type GITHUB_FILE_MODE =
  | "100644"
  | "100755"
  | "040000"
  | "160000"
  | "120000";
export interface GithubCommitableFile {
  path: string;
  content: string;
  mode?: GITHUB_FILE_MODE;
}

export type GithubRepo = {
  name: string;
  owner: string;
  url: string;
  avatarUrl: string;
  description: string;
  stargazersCount: number;
  organization: string | undefined;
};

export type GithubSourceRepo = {
  githubUrl: string | undefined;
  repoName: string | undefined;
  owner: string | undefined;
  repo: string | undefined;
};
