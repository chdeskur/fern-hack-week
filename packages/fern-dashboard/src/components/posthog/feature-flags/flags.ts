export const PosthogFeatureFlag = {
  ENABLE_DOCS_PAGE: "dashboard-enable-docs-page",
  ENABLE_SDKS_PAGE: "dashboard-enable-sdks-page",
  ENABLE_API_KEYS_PAGE: "dashboard-enable-api-keys-page",
  ENABLE_BILLING_PAGE: "dashboard-enable-billing-page",
  ENABLE_DOCS_ANALYTICS_TAB: "dashboard-enable-docs-analytics-tab",
  ENABLE_DOCS_AI_SEARCH_TAB: "dashboard-enable-docs-ai-search-tab",
} as const;

export type PosthogFeatureFlag =
  (typeof PosthogFeatureFlag)[keyof typeof PosthogFeatureFlag];

export type PosthogFeatureFlags = Record<PosthogFeatureFlag, boolean>;
