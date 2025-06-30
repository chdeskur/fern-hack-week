import { useState } from "react";

import { SearchIcon } from "lucide-react";

import { truncateString } from "@fern-api/docs-utils";
import { FernImage } from "@fern-docs/components/FernImage";
import { getLoadableValue } from "@fern-ui/loadable";

import { DashboardApiClient } from "@/app/services/dashboard-api/client";
import { useUserGithubRepos } from "@/state/useUserGithubRepos";

import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function SetGithubSourcePopover({
  docsUrl,
  children,
  setIsSaving,
}: {
  docsUrl: string;
  children: React.ReactNode;
  setIsSaving: (isSaving: boolean) => void;
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const repos = getLoadableValue(useUserGithubRepos());

  // Filter repos based on search query
  // const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);
  const filteredRepos =
    repos?.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.url?.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  const handleRepoSelect = async (repoUrl: string) => {
    console.log("handleRepoSelect", repoUrl);
    try {
      setIsSaving(true);
      setIsPopoverOpen(false);
      await DashboardApiClient.postDocsGithubSource({
        url: docsUrl,
        githubUrl: repoUrl,
      });
      setSearchQuery("");
    } catch (e) {
      console.error("Error saving GitHub source:", e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="border-border w-80 border p-0" align="start">
        <div className="flex flex-col">
          <div className="flex items-center border-b p-2">
            <div className="border-border flex flex-1 items-center rounded-md border px-3">
              <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
              <Input
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredRepos.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchQuery
                  ? "No repositories found"
                  : "No repositories available"}
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={`${repo.url}-${repo.name}`}
                  className="flex w-full justify-between px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <button
                    className="flex items-start gap-2"
                    onClick={() => void handleRepoSelect(repo.url)}
                  >
                    <FernImage
                      src={repo.avatarUrl}
                      alt={repo.name}
                      className="mt-1 size-6 rounded-sm border p-[2px]"
                    />
                    <div className="flex flex-col text-left">
                      <p className="font-medium">{repo.name}</p>
                      <p className="text-xs text-gray-900">
                        {[
                          truncateString(repo.description ?? "", 70),
                          repo.owner,
                          repo.stargazersCount
                            ? `${repo.stargazersCount} stars`
                            : null,
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
