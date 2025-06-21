"use client";

import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftIcon, Globe, SettingsIcon } from "lucide-react";

import { Auth0SessionData } from "@/app/services/auth0/getCurrentSession";

import { GithubLogo } from "../auth/GithubLogo";
import { ProfileImage } from "../layout/ProfileImage";
import { Button } from "../ui/button";

export function HeaderToolbar({
  orgName,
  session,
}: {
  orgName: string;
  session: Auth0SessionData;
}) {
  const { name, picture } = session.user;

  const handleCommit = () => {
    // TODO: Implement this.
    console.log("commit");
  };

  const handlePublish = () => {
    // TODO: Implement this.
    console.log("publish");
  };

  return (
    <div className="flex h-12 items-center justify-center border-b border-gray-500 bg-white px-2 shadow-sm">
      <div className="flex flex-1 items-center gap-2 text-left">
        <Button className="px-2" variant="ghost" size="iconSm" asChild>
          <a href={`/${orgName}/docs`}>
            <ArrowLeftIcon />
          </a>
        </Button>
        <p className="text-(--grayscale-a10)">PR Title</p>
      </div>
      <div className="flex items-center gap-2">
        <ProfileImage
          picture={picture}
          name={name}
          className="ring-accent border-3 border-white ring-2"
        />
        <div className="bg-(--grayscale-a2) border-border rounded-full border px-3 py-0.5">
          {/* TODO: Add undo button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("undo")}
          >
            <ArrowUturnLeftIcon />
          </Button>
          {/* TODO: Add redo button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("redo")}
          >
            <ArrowUturnRightIcon />
          </Button>
          {/* TODO: Add settings button functionality */}
          <Button
            variant="ghost"
            className="cursor-not-allowed"
            size="iconSm"
            onClick={() => console.log("settings")}
          >
            <SettingsIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 shrink-0 items-center justify-end gap-1">
        {/* TODO: Add preview button functionality */}
        <Button
          variant="ghost"
          size="sm"
          className="text-(--grayscale-a10) cursor-not-allowed"
        >
          <Globe />
          Preview
        </Button>
        {/* <Button variant="ghost">Files</Button> */}

        <div className="flex">
          <Button className="rounded-r-none border-r-0" onClick={handleCommit}>
            <GithubLogo />
            Commit
          </Button>
          <Button
            variant="outline"
            className="rounded-l-none border-l-0"
            onClick={handlePublish}
          >
            <GithubLogo />
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
