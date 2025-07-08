"use client";

import Image from "next/image";

import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

import { useLocationHref } from "@fern-docs/components/hooks/useLocationHref";

import { GithubLogo } from "../auth/GithubLogo";
import { LoginButton } from "../auth/LoginButton";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { GradientBackground } from "./GradientBackground";
import { LogoCard } from "./LogoCard";

export function AuthorizeGithubModal() {
  const currentLocation = useLocationHref();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-fit">
          <GithubLogo />
          Authorize GitHub
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border fixed inset-0 z-50 flex flex-col items-center justify-center gap-0 border bg-white pt-0">
        <div className="border-border relative flex h-[170px] w-full flex-col justify-center border-b">
          <GradientBackground className="absolute left-0 top-0 w-full" />
          <div className="z-1 flex items-center justify-center gap-4">
            <LogoCard>
              <Image
                src="/fern-leaf-green.svg"
                alt="Fern"
                width={100}
                height={100}
                className="size-6"
              />
            </LogoCard>
            <ArrowsRightLeftIcon className="text-muted-foreground size-6" />
            <LogoCard>
              <div className="text-muted-foreground flex h-6 w-6 items-center justify-center">
                <GithubLogo />
              </div>
            </LogoCard>
          </div>
        </div>
        <div className="flex w-full max-w-md flex-col gap-6 p-8">
          <div className="text-center">
            <p className="font-bold">
              Fern requires additional permissions to edit and publish your docs
              site
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <LoginButton
              additionalParams={{
                connection: "github",
                connection_scope: "read:user,read:org,repo",
              }}
              returnTo={currentLocation}
            >
              <GithubLogo />
              Authorize GitHub
            </LoginButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
