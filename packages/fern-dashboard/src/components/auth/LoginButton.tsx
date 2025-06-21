import { Button } from "../ui/button";
import { GithubLogo } from "./GithubLogo";

export const LoginButton = ({
  returnTo,
  additionalParams,
}: {
  returnTo?: string;
  additionalParams?: Record<string, string>;
}) => {
  return (
    <Button asChild>
      <a href={getLoginUrl({ returnTo, additionalParams })}>
        <GithubLogo />
        Continue with Github
      </a>
    </Button>
  );
};

function getLoginUrl({
  returnTo,
  additionalParams,
}: {
  returnTo?: string;
  additionalParams?: Record<string, string>;
} = {}) {
  const searchParams = new URLSearchParams(additionalParams);
  if (returnTo != null) {
    searchParams.append("returnTo", returnTo);
  }
  return `/auth/login?${searchParams.toString()}`;
}
