import {
  CodeBracketIcon,
  CreditCardIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { Auth0OrgName } from "@/app/services/auth0/types";

import { PosthogFeatureFlag } from "../posthog/feature-flags/flags";
import { FeatureFlaggedServerSide } from "../posthog/feature-flags/server-side";
import { ThemeToggle } from "../theme/ThemeToggle";
import { DocsNavbarItems } from "./DocsNavbarItems";
import { ICON_SIZE, NavbarItem } from "./NavbarItem";
import { NavbarSectionTitle } from "./NavbarSectionTitle";

export declare namespace Navbar {
  export interface Props {
    orgName: Auth0OrgName;
  }
}

export function Navbar({ orgName }: Navbar.Props) {
  return (
    <div className="lg:w-74 flex flex-col justify-between md:w-64 md:py-6 md:pl-4 md:transition-[width]">
      <div className="flex overflow-y-auto md:flex-col md:pb-4">
        <FeatureFlaggedServerSide
          flag={PosthogFeatureFlag.ENABLE_DOCS_PAGE}
          orgName={orgName}
        >
          <DocsNavbarItems />
        </FeatureFlaggedServerSide>
        <FeatureFlaggedServerSide
          flag={PosthogFeatureFlag.ENABLE_SDKS_PAGE}
          orgName={orgName}
        >
          <NavbarItem
            title="SDKs"
            icon={<CodeBracketIcon className={ICON_SIZE} />}
            href="/sdks"
          />
        </FeatureFlaggedServerSide>
        <NavbarSectionTitle title="Settings" />
        <NavbarItem
          title="Members"
          icon={<UsersIcon className={ICON_SIZE} />}
          href="/members"
        />
        <FeatureFlaggedServerSide
          flag={PosthogFeatureFlag.ENABLE_API_KEYS_PAGE}
          orgName={orgName}
        >
          <NavbarItem
            title="API Keys"
            icon={<KeyIcon className={ICON_SIZE} />}
            href="/api-keys"
          />
        </FeatureFlaggedServerSide>
        <FeatureFlaggedServerSide
          flag={PosthogFeatureFlag.ENABLE_BILLING_PAGE}
          orgName={orgName}
        >
          <NavbarItem
            title="Billing"
            icon={<CreditCardIcon className={ICON_SIZE} />}
            href="/billing"
          />
        </FeatureFlaggedServerSide>
      </div>
      <div className="hidden flex-col md:flex">
        <div className="mb-4 mr-4 h-px bg-gray-500" />
        <ThemeToggle />
      </div>
    </div>
  );
}
