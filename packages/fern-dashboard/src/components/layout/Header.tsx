import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/outline";
import { PopoverArrow } from "@radix-ui/react-popover";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LogoutButton } from "../auth/LogoutButton";
import { OrgSwitcher } from "../auth/OrgSwitcher";
import { ThemedFernLogo } from "../theme/ThemedFernLogo";
import { HeaderLinkButton } from "./HeaderLinkButton";
import { MaybeDocsHeaderItems } from "./MaybeDocsHeaderItems";
import { SupportButton } from "./SupportButton";

export declare namespace Header {
  export interface Props {
    session: Auth0SessionData;
  }
}

export async function Header({ session }: Header.Props) {
  const { name, email, picture } = session.user;

  return (
    <div className="flex justify-between gap-4 p-4">
      <div className="flex min-w-0 items-center gap-4">
        <ThemedFernLogo className="w-16" />
        <OrgSwitcher />
        <MaybeDocsHeaderItems />
      </div>
      <div className="flex shrink-0 gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <SupportButton className="mr-4" />
          <HeaderLinkButton
            text="Docs"
            href="https://buildwithfern.com/learn"
          />
          <HeaderLinkButton
            text="Changelog"
            href="https://buildwithfern.com/learn/docs/getting-started/changelog"
          />
        </div>
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            {picture != null ? (
              <Image
                src={picture}
                alt={name ?? "user photo"}
                className="rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <div className="bg-gray-1200 border-border size-8 rounded-full border p-1">
                <UserIcon className="size-full text-white" />
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent collisionPadding={8}>
            <PopoverArrow className="fill-popover" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-xs text-gray-900">
                <div>{name}</div>
                <div>{email}</div>
              </div>
              <LogoutButton />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
