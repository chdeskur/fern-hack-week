import { User } from "@auth0/nextjs-auth0/types";
import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "../ui/button";
import { DocsZeroStateImage } from "./DocsZeroStateImage";

export declare namespace DocsZeroState {
  export interface Props {
    user: User;
  }
}

export async function DocsZeroState({ user }: DocsZeroState.Props) {
  let welcomeString = "Welcome";
  const firstName = getFirstName(user);
  if (firstName != null) {
    welcomeString += ", " + firstName;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="text-xl font-bold">{welcomeString}</div>
      <div className="mt-2 text-sm text-gray-900">
        Delight your developers with gorgeous Docs.
      </div>
      <div className="mt-12">
        <div className="flex flex-col gap-12">
          <div className="border-border flex h-[300px] justify-center overflow-hidden border-b">
            <DocsZeroStateImage />
          </div>
          <div className="flex justify-center">
            <Button>
              <PlusIcon />
              Create your first Docs site
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getFirstName(user: User) {
  if (user.given_name != null) {
    return user.given_name;
  }
  if (user.name != null) {
    return user.name.split(" ")[0];
  }
  return undefined;
}
