import { Button } from "../ui/button";

export declare namespace HeaderLinkButton {
  export interface Props {
    text: string;
    href: string;
  }
}

export function HeaderLinkButton({ text, href }: HeaderLinkButton.Props) {
  return (
    <Button size="sm" variant="ghost" asChild>
      <a href={href} target="_blank">
        {text}
      </a>
    </Button>
  );
}
