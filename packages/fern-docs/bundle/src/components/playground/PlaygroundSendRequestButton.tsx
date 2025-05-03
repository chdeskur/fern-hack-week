import { FC, ReactNode } from "react";

import {
  FernButton,
  FernTooltip,
  FernTooltipProvider,
  cn,
} from "@fern-docs/components";

import { isLocal } from "@/server/isLocal";

interface PlaygroundSendRequestButtonProps {
  sendRequest?: () => void;
  disabled?: boolean;
  sendRequestButtonLabel?: string;
  sendRequestIcon?: ReactNode;
}

export const PlaygroundSendRequestButton: FC<
  PlaygroundSendRequestButtonProps
> = ({ sendRequest, sendRequestButtonLabel, sendRequestIcon, disabled }) => {
  const isLocalEnvironment = isLocal();
  const content = isLocalEnvironment
    ? "Cannot send requests from local environment"
    : "Cannot send requests to localhost";

  return (
    <FernTooltipProvider>
      <FernTooltip content={disabled ? content : undefined}>
        <FernButton
          className={cn("group relative overflow-hidden font-semibold", {
            "after:animate-shine after:absolute after:inset-y-0 after:w-8 after:bg-white/50 after:blur after:content-['']":
              !!sendRequest,
          })}
          rightIcon={sendRequestIcon}
          onClick={sendRequest}
          intent="primary"
          rounded
          size="large"
          skeleton={!sendRequest}
          disabled={disabled}
        >
          {sendRequestButtonLabel ?? "Send Request"}
        </FernButton>
      </FernTooltip>
    </FernTooltipProvider>
  );
};
