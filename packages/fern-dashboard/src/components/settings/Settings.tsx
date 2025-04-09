import { DocsUrl } from "@/utils/types";

import { ArchiveSiteButton } from "./ArchiveSiteButton";

export declare namespace Settings {
  export interface Props {
    docsUrl: DocsUrl;
  }
}

export function Settings({ docsUrl }: Settings.Props) {
  return (
    <div className="border-border mx-auto mt-6 flex max-w-[750px] flex-1 flex-col rounded-xl border bg-gray-100 p-4 sm:mt-8 md:mt-10">
      <div className="flex flex-col gap-1">
        <div className="font-bold">Archive site</div>
        <div className="text-gray-900">
          This will hide the site from the dashboard, but any deployed domains
          will remain live.
        </div>
      </div>
      <div className="mt-5 flex justify-center md:justify-end">
        <ArchiveSiteButton docsUrl={docsUrl} />
      </div>
    </div>
  );
}
