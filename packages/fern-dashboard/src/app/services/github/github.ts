import { DashboardApiClient } from "../dashboard-api/client";

export async function handleCreatePr({ branch }: { branch: string }) {
  const response = await DashboardApiClient.postCreatePr({
    owner: "fern-api",
    repo: "fern",
    head: branch,
    base: "main",
    title: "Visual Editor: Update",
  });
  if (response.success) {
    console.log("Successfully created PR:", response.prUrl);
    window.open(response.prUrl, "_blank");
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
}

export async function handleGeneratePrDescription({
  branch,
}: {
  branch: string;
}) {
  const response = await DashboardApiClient.generatePrDescription({
    owner: "fern-api",
    repo: "fern",
    branch,
    baseBranch: "main",
  });
  if (response.success) {
    console.log("Successfully generated PR description:", response.newTitle);
  } else {
    console.error("Failed to generate PR description:", response.error);
  }
}
