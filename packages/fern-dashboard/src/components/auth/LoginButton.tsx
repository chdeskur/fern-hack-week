import { Button } from "../ui/button";
import { GithubLogo } from "./GithubLogo";

export const LoginButton = () => {
  return (
    <Button asChild>
      <a href={getLoginUrl()}>
        <GithubLogo />
        Continue with Github
      </a>
    </Button>
  );
};

function getLoginUrl({
  returnTo,
}: {
  returnTo?: string;
} = {}) {
  const searchParams = new URLSearchParams();
  if (returnTo != null) {
    searchParams.append("returnTo", returnTo);
  }
  return `/auth/login?${searchParams.toString()}`;
}
