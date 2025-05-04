import { cwd, resolve } from "@fern-api/fs-utils";
import { cloneRepository } from "@fern-api/github";

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
      await repository.overwriteLocalContents(sourceDirectory);
      await repository.add(".");
      await repository.commit();
      await repository.push();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async pr(): Promise<void> {
    console.log("TODO: Implement PR");
  }

  public async release(): Promise<void> {
    console.log("TODO: Implement release");
  }
}
