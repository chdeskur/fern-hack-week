import { getCurrentSessionOrThrow } from "@/app/services/auth0/getCurrentSession";
import { Auth0OrgName } from "@/app/services/auth0/types";

import { Navbar } from "../navbar/Navbar";
import { Header } from "./Header";
import { Footer } from "./footer/Footer";

export declare namespace AppLayout {
  export interface Props {
    children: React.JSX.Element;
    sidepanel: React.ReactNode;
    orgName: Auth0OrgName;
  }
}

export async function AppLayout({
  children,
  sidepanel,
  orgName,
}: AppLayout.Props) {
  const session = await getCurrentSessionOrThrow();
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <Header session={session} />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row-reverse">
        <div className="relative flex flex-1 gap-4 overflow-hidden">
          <div className="flex min-w-0 flex-1">
            <div className="border-border flex flex-1 justify-center overflow-y-auto border-x border-t bg-white px-6 pt-8 md:rounded-t-2xl lg:px-12 lg:pt-12 dark:bg-black">
              <div className="flex min-w-0 max-w-[1200px] flex-1 flex-col">
                <div className="flex flex-1">{children}</div>
                <div className="py-12">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
          <div className="w-0 overflow-y-auto transition-all duration-300 md:w-auto">
            {sidepanel}
          </div>
        </div>
        <Navbar orgName={orgName} />
      </div>
    </div>
  );
}
