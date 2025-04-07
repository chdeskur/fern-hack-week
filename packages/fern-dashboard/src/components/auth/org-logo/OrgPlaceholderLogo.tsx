import { Auth0Organization } from "@/app/services/auth0/types";

export declare namespace OrgPlaceholderLogo {
  export interface Props {
    org: Auth0Organization;
  }
}

export function OrgPlaceholderLogo({ org }: OrgPlaceholderLogo.Props) {
  return (
    <div className="dark:bg-gray-1200 dark:border-gray-1100 flex flex-1 items-center justify-center rounded border bg-gray-700 p-1 text-xl uppercase text-gray-900">
      {org.display_name[0]}
    </div>
  );
}
