import { DashboardApiClient } from "../dashboard-api/client";

export async function handleCreatePr({
  branch,
  owner,
  repo,
  baseBranch,
}: {
  branch: string;
  owner: string;
  repo: string;
  baseBranch: string;
}) {
  try {
    const response = await DashboardApiClient.postCreatePr({
      owner,
      repo,
      head: branch,
      base: baseBranch,
      title: "Visual Editor: Update",
    });
    if (response.success) {
      console.log("Successfully created PR:", response.prUrl);
      window.open(response.prUrl, "_blank");
      try {
        // No need to await this, we just want to try to generate a PR description.
        void handleGeneratePrDescription({
          branch,
          owner,
          repo,
          baseBranch,
        });
      } catch (error) {
        // Silently fail if we can't generate a PR description.
        console.error("Error generating PR description:", error);
      }
    } else {
      console.error("Failed to create PR:", response.error);
      // This is a hack to open the PR in a new tab if it already exists
      // once state is managed, and if PR exists, should not enter this function.
      // TODO: instead raise error (ie PR already exists)
      if (
        typeof response.error === "string" &&
        response.error.includes("A pull request already exists")
      ) {
        window.open(
          `https://github.com/fern-api/fern/compare/main...${branch}`,
          "_blank"
        );
      }
    }
  } catch (error) {
    console.error("Error creating PR:", error);
  }
}

export async function handleGeneratePrDescription({
  branch,
  owner,
  repo,
  baseBranch,
}: {
  branch: string;
  owner: string;
  repo: string;
  baseBranch: string;
}) {
  const response = await DashboardApiClient.generatePrDescription({
    owner,
    repo,
    branch,
    baseBranch,
  });
  if (response.success) {
    console.log("Successfully generated PR description:", response.newTitle);
  } else {
    console.error("Failed to generate PR description:", response.error);
  }
}
