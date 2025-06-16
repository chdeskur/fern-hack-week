import { createEditableDocsLoader } from "@fern-api/docs-loader";
import { createFileResolver } from "@fern-api/docs-server/file-resolver";
import { withLogo } from "@fern-api/docs-server/withLogo";
import { FernNavigation } from "@fern-api/fdr-sdk";
import { getPageId, slugjoin } from "@fern-api/fdr-sdk/navigation";
import { AbstractLogo } from "@fern-docs/components/abstract/logo";
import { getFrontmatter } from "@fern-docs/mdx";

import { getCurrentSession } from "@/app/services/auth0/getCurrentSession";

export default async function LogoPage({
  params,
}: {
  params: Promise<{ orgName: string; slug: string }>;
}) {
  const session = await getCurrentSession();
  const { orgName, slug } = await params;
  const loader = await createEditableDocsLoader(
    "localhost:3000",
    orgName,
    session?.accessToken
  );

  const [{ basePath }, config, files, root] = await Promise.all([
    loader.getMetadata(),
    loader.getConfig(),
    loader.getFiles(),
    loader.getRoot(),
  ]);

  const resolveFileSrc = createFileResolver(files);
  const foundNode = FernNavigation.utils.findNode(root, slugjoin(slug));

  let frontmatter = null;
  if (foundNode.type === "found") {
    const pageId = getPageId(foundNode.node);
    if (pageId) {
      const page = await loader.getPage(pageId);
      frontmatter = page ? getFrontmatter(page.markdown) : null;
    }
  }

  return (
    <AbstractLogo
      logo={withLogo(config, resolveFileSrc, basePath, frontmatter?.data)}
    />
  );
}
