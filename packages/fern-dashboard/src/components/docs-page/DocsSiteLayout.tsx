import { Auth0OrgName } from "@/app/services/auth0/types";
import { DocsUrl } from "@/utils/types";

import { PageHeader } from "../layout/PageHeader";
import { DocsSiteClientWrapper } from "./DocsSiteClientWrapper";
import { DocsSiteNavBar } from "./DocsSiteNavBar";

export declare namespace DocsSiteLayout {
  export interface Props {
    docsUrl: DocsUrl;
    orgName: Auth0OrgName;
    children: React.JSX.Element;
  }
}

export async function DocsSiteLayout({
  docsUrl,
  orgName,
  children,
}: DocsSiteLayout.Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <PageHeader
        title={<span className="break-all">{docsUrl}</span>}
        titleRightContent={
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-300 px-3 py-2">
            <div className="bg-green-1100 size-2 rounded-full" />
            <div className="text-green-1100 mb-0.5 text-sm leading-none">
              Live
            </div>
          </div>
        }
      />
      <div className="flex flex-col gap-4">
        <DocsSiteNavBar orgName={orgName} />
        <div className="flex">
          <DocsSiteClientWrapper docsUrl={docsUrl}>
            {children}
          </DocsSiteClientWrapper>
        </div>
      </div>
    </div>
  );
}
