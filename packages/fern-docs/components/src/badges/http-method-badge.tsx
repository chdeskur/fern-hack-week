import { forwardRef } from "react";

import { GrpcMethod, HttpOrWssOrGrpc } from "@fern-api/docs-utils";

import { UIColor } from "../colors";
import { Badge, BadgeProps } from "./badge";

const METHOD_COLOR_SCHEMES: Record<HttpOrWssOrGrpc, UIColor> = {
  GET: "green",
  DELETE: "red",
  POST: "blue",
  PUT: "amber",
  PATCH: "orange",
  HEAD: "gray",
  OPTIONS: "bronze",
  CONNECT: "sky",
  TRACE: "purple",
  WSS: "green",
  UNARY: "gray",
  CLIENT_STREAM: "gray",
  SERVER_STREAM: "gray",
  BIDIRECTIONAL_STREAM: "gray",
};

/**
 * Abbreviated method names for smaller (fixed-width) badges.
 */
const ABBREVIATED_METHODS: Record<HttpOrWssOrGrpc, string> = {
  GET: "GET",
  DELETE: "DEL",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  HEAD: "HEAD",
  OPTIONS: "OPT",
  CONNECT: "CON",
  TRACE: "TRACE",
  WSS: "WSS",
  UNARY: "UNARY",
  CLIENT_STREAM: "STREAM",
  SERVER_STREAM: "STREAM",
  BIDIRECTIONAL_STREAM: "STREAM",
};

export interface HttpOrWSSOrGrpcBadgeProps extends Omit<BadgeProps, "color"> {
  method: HttpOrWssOrGrpc;
}

export const HttpMethodBadge = forwardRef<
  HTMLSpanElement & HTMLButtonElement,
  HttpOrWSSOrGrpcBadgeProps
>((props, ref) => {
  const { method, ...rest } = props;
  return (
    <Badge
      ref={ref}
      {...rest}
      data-badge-type="http-method"
      data-http-method={method}
      color={METHOD_COLOR_SCHEMES[method]}
    >
      {props.children ??
        (rest.size === "sm" || method in GrpcMethod
          ? ABBREVIATED_METHODS[method]
          : method)}
    </Badge>
  );
});

HttpMethodBadge.displayName = "HttpMethodBadge";
