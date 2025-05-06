import { cwd, resolve } from "@fern-api/fs-utils";
import { cloneRepository } from "@fern-api/github";
import { ClonedRepository } from "@fern-api/github/src/ClonedRepository";

import { FernGeneratorCli } from "../configuration/generated";

export class GitHub {
  private githubConfig: FernGeneratorCli.GitHubConfig;

  constructor({
    githubConfig,
  }: {
    githubConfig: FernGeneratorCli.GitHubConfig;
  }) {
    this.githubConfig = githubConfig;
  }

  public async push(): Promise<void> {
    try {
      const wd = cwd();

      const sourceDirectory = resolve(wd, this.githubConfig.sourceDirectory);

      const repository = await cloneRepository({
        githubRepository: this.githubConfig.uri,
        installationToken: this.githubConfig.token,
      });

      const branch =
        this.githubConfig.branch ?? (await repository.getDefaultBranch());

      await repository.checkout(branch);
      await repository.pull(branch);
      const fernIgnore = await repository.getFernignore();
      await repository.overwriteLocalContents(sourceDirectory);
      await repository.add(".");
      await this.restoreFernignoreFiles(repository, fernIgnore);
      await repository.commit("SDK Generation");
      await repository.push();
    } catch (error) {
      // TODO: migrate this to use @fern-api/logger
      console.error("Error during GitHub push:", error);
      throw error;
    }
  }

  public async pr(): Promise<void> {
    console.log("TODO: Implement PR");
  }

  public async release(): Promise<void> {
    console.log("TODO: Implement release");
  }

  private getFernignoreFiles(fernignore: string): string[] {
    const fernignoreLines = fernignore.split("\n");
    const fernignoreFiles: string[] = [];
    for (const line of fernignoreLines) {
      const trimmedLine = line.trim();
      if (!trimmedLine.startsWith("#") && trimmedLine.length > 0) {
        fernignoreFiles.push(trimmedLine);
      }
    }
    return fernignoreFiles;
  }

  private async restoreFernignoreFiles(
    repository: ClonedRepository,
    fernignore: string | undefined
  ): Promise<void> {
    if (fernignore === undefined) {
      return;
    }
    const files = this.getFernignoreFiles(fernignore);
    await repository.restoreFiles({ files, staged: true });
    await repository.restoreFiles({ files: files });
  }
}
