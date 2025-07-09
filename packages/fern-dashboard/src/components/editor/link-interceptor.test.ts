import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { interceptLinkClick } from "./link-interceptor";

// Mock window.location
const mockLocation = {
  href: "",
};

// Mock window object
const mockWindow = {
  location: mockLocation,
};

// Mock window.location.href
Object.defineProperty(global, "window", {
  value: mockWindow,
  writable: true,
});

const mockPreventDefault = vi.fn();

describe("interceptLinkClick", () => {
  const defaultMetadata = {
    orgName: "test-org",
    docsUrl: "test-docs",
    branch: "main",
    basePath: "/",
  };

  beforeEach(() => {
    // Reset mock location
    mockLocation.href = "";
    // Reset all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockEvent = (target: HTMLElement) => {
    return {
      target,
      preventDefault: mockPreventDefault,
    } as unknown as MouseEvent;
  };

  const createMockLink = (href: string, text = "Test Link") => {
    const removedAttributes = new Set<string>();

    const link = {
      href,
      textContent: text,
      removeAttribute: vi.fn((attribute: string) => {
        removedAttributes.add(attribute);
      }),
      getAttribute: (attribute: string) => {
        if (removedAttributes.has(attribute)) {
          return null;
        }
        if (attribute === "href") {
          return href;
        }
        return null;
      },
    } as unknown as HTMLAnchorElement;
    return link;
  };

  const createMockTarget = (link: HTMLAnchorElement | null) => {
    const target = {
      textContent: "Click me",
      appendChild: vi.fn(),
      closest: vi.fn().mockReturnValue(link),
    } as unknown as HTMLElement;

    return target;
  };

  describe("when no link is found", () => {
    it("should return early when target has no link ancestor", () => {
      const target = createMockTarget(null);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });

    it("should return early when link has no href attribute", () => {
      const link = createMockLink("");
      link.removeAttribute("href");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });
  });

  describe("when link should be skipped", () => {
    it("should skip external http links", () => {
      const link = createMockLink("https://example.com");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });

    it("should skip external https links", () => {
      const link = createMockLink("https://api.example.com/docs");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });

    it("should skip mailto links", () => {
      const link = createMockLink("mailto:user@example.com");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });

    it("should skip anchor links", () => {
      const link = createMockLink("#section-1");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });

    it("should skip links that already contain /editor/", () => {
      const link = createMockLink("/test-org/editor/test-docs/main/page");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });
  });

  describe("when link should be intercepted", () => {
    it("should handle relative paths starting with /", () => {
      const link = createMockLink("/api/endpoints");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints"
      );
    });

    it("should handle relative paths without leading /", () => {
      const link = createMockLink("api/endpoints");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints"
      );
    });

    it("should handle nested paths", () => {
      const link = createMockLink("/docs/api/authentication");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/docs/api/authentication"
      );
    });

    it("should handle paths with query parameters", () => {
      const link = createMockLink("/api/endpoints?version=1.0");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints?version=1.0"
      );
    });

    it("should handle paths with hash fragments", () => {
      const link = createMockLink("/api/endpoints#authentication");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints#authentication"
      );
    });

    it("should handle root path", () => {
      const link = createMockLink("/");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).toHaveBeenCalledOnce();
      expect(mockLocation.href).toBe("/test-org/editor/test-docs/main/");
    });

    it("should handle empty path", () => {
      const link = createMockLink("");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockLocation.href).toBe("");
    });
  });

  describe("with different metadata values", () => {
    it("should work with different org names", () => {
      const link = createMockLink("/api/docs");
      const target = createMockTarget(link);
      const event = createMockEvent(target);
      const metadata = { ...defaultMetadata, orgName: "different-org" };

      interceptLinkClick(event, metadata);

      expect(mockLocation.href).toBe(
        "/different-org/editor/test-docs/main/api/docs"
      );
    });

    it("should work with different docs URLs", () => {
      const link = createMockLink("/api/docs");
      const target = createMockTarget(link);
      const event = createMockEvent(target);
      const metadata = { ...defaultMetadata, docsUrl: "different-docs" };

      interceptLinkClick(event, metadata);

      expect(mockLocation.href).toBe(
        "/test-org/editor/different-docs/main/api/docs"
      );
    });

    it("should work with different branches", () => {
      const link = createMockLink("/api/docs");
      const target = createMockTarget(link);
      const event = createMockEvent(target);
      const metadata = { ...defaultMetadata, branch: "develop" };

      interceptLinkClick(event, metadata);

      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/develop/api/docs"
      );
    });

    it("should work with special characters in metadata", () => {
      const link = createMockLink("/api/docs");
      const target = createMockTarget(link);
      const event = createMockEvent(target);
      const metadata = {
        orgName: "org-with-dashes",
        docsUrl: "docs_with_underscores",
        branch: "feature/branch-name",
        basePath: "/",
      };

      interceptLinkClick(event, metadata);

      expect(mockLocation.href).toBe(
        "/org-with-dashes/editor/docs_with_underscores/feature/branch-name/api/docs"
      );
    });
  });

  describe("edge cases", () => {
    it("should handle very long paths", () => {
      const longPath =
        "/very/deep/nested/path/with/many/segments/that/goes/on/and/on";
      const link = createMockLink(longPath);
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockLocation.href).toBe(
        `/test-org/editor/test-docs/main${longPath}`
      );
    });

    it("should handle paths with special characters", () => {
      const link = createMockLink("/api/endpoints/with-special-chars_123");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints/with-special-chars_123"
      );
    });

    it("should handle paths with spaces (URL encoded)", () => {
      const link = createMockLink("/api/endpoints/with%20spaces");
      const target = createMockTarget(link);
      const event = createMockEvent(target);

      interceptLinkClick(event, defaultMetadata);

      expect(mockLocation.href).toBe(
        "/test-org/editor/test-docs/main/api/endpoints/with%20spaces"
      );
    });
  });
});
