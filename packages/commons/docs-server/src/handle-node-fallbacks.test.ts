import { describe, expect, it } from "vitest";

import { FernNavigation } from "@fern-api/fdr-sdk";
import { NodeId } from "@fern-api/fdr-sdk/navigation";

import {
  getFallbackProduct,
  getFallbackVersion,
  getHeaderTabs,
} from "./handle-node-fallbacks";
import {
  createFoundNode,
  createNotFoundNode,
  createPageNode,
  createProductNode,
  createRootNode,
  createTabNode,
  createVersionNode,
} from "./utils/create-node";

describe("handle-node-fallbacks", () => {
  describe("getFallbackProduct", () => {
    it("should return product from found node parents", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const pageNode = createPageNode("test-page", "Test Page");

      const foundNode: FernNavigation.utils.Node = createFoundNode(
        pageNode,
        [productNode],
        createRootNode([productNode], "productgroup")
      );

      const root = createRootNode([productNode], "productgroup");

      const result = getFallbackProduct(
        foundNode,
        root,
        "test-product/test-page"
      );
      expect(result).toEqual(productNode);
    });

    it("should return product based on slug match", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "productgroup");

      const result = getFallbackProduct(
        foundNode,
        root,
        "test-product/test-page"
      );
      expect(result).toEqual(productNode);
    });

    it("should not return product if slug match does not exact match start with product slug", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "productgroup");

      const result = getFallbackProduct(
        foundNode,
        root,
        "test-producttttt/test-page"
      );
      expect(result).toEqual(productNode);
    });

    it("should not return product if slug match does not start with product slug", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "productgroup");

      const result = getFallbackProduct(
        foundNode,
        root,
        "/extra/test-product/test-page"
      );
      expect(result).toEqual(productNode);
    });

    it("should return first product from product group if no match found", () => {
      const productNode = createProductNode(
        "default-product",
        "Default Product"
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "productgroup");

      const result = getFallbackProduct(foundNode, root, "non-existent");
      expect(result).toEqual(productNode);
    });

    it("should return null if no product can be found", () => {
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([]);

      const result = getFallbackProduct(foundNode, root, "non-existent");
      expect(result).toBeNull();
    });
  });

  describe("getFallbackVersion", () => {
    it("should return version from found node parents", () => {
      const versionNode = createVersionNode("v1", []);
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        true
      );
      const pageNode = createPageNode("test-page", "Test Page");

      const foundNode: FernNavigation.utils.Node = createFoundNode(
        pageNode,
        [versionNode, productNode],
        createRootNode([productNode], "versioned")
      );
      const root = createRootNode([productNode], "versioned");

      const result = getFallbackVersion(
        foundNode,
        root,
        "test-product/v1/test-page"
      );
      expect(result).toEqual(versionNode);
    });

    it("should return version based on slug match in product", () => {
      const versionNode = createVersionNode("v1", []);
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        true
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "versioned");

      const result = getFallbackVersion(
        foundNode,
        root,
        "test-product/v1/test-page"
      );
      expect(result).toEqual(versionNode);
    });

    it("should return first version from product if no match found", () => {
      const versionNode = createVersionNode("v1", []);
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        true
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode], "versioned");

      const result = getFallbackVersion(
        foundNode,
        root,
        "test-product/non-existent"
      );
      expect(result).toEqual(versionNode);
    });

    it("should return null if no version can be found", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();
      const root = createRootNode([productNode]);

      const result = getFallbackVersion(
        foundNode,
        root,
        "test-product/non-existent"
      );
      expect(result).toBeNull();
    });
  });

  describe("getHeaderTabs", () => {
    it("should return tabs from found node if available", () => {
      const tabNode = createTabNode("tab1", "Tab 1");
      const pageNode = createPageNode("test-page", "Test Page");
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );

      const foundNode: FernNavigation.utils.Node = {
        ...createFoundNode(
          pageNode,
          [productNode],
          createRootNode([productNode], "productgroup")
        ),
        tabs: [tabNode],
      };
      const root = createRootNode([productNode], "productgroup");

      const result = getHeaderTabs(foundNode, root, "test-product/test-page");
      expect(result).toEqual([tabNode]);
    });

    it("should return tabs from root if node not found and root has tabs", () => {
      const tabNode = createTabNode("tab1", "Tab 1");
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      const root = createRootNode([productNode], "unversioned");
      if (root.child.type === "unversioned") {
        root.child.child = {
          type: "tabbed",
          id: FernNavigation.NodeId("tabbed"),
          children: [tabNode],
        };
      }
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();

      const result = getHeaderTabs(foundNode, root, "test-product/test-page");
      expect(result).toEqual([tabNode]);
    });

    it("should return tabs from unversioned product if node not found", () => {
      const tabNode = createTabNode("tab1", "Tab 1");
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false
      );
      if (productNode.child.type === "unversioned") {
        productNode.child.child = {
          type: "tabbed",
          id: FernNavigation.NodeId("tabbed"),
          children: [tabNode],
        };
      }
      const root = createRootNode([productNode], "unversioned");
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();

      const result = getHeaderTabs(foundNode, root, "test-product/test-page");
      expect(result).toEqual([tabNode]);
    });

    it("should return tabs from versioned product if node not found", () => {
      const tabNode = createTabNode("tab1", "Tab 1");
      const versionNode = createVersionNode("v1", []);
      versionNode.child = {
        type: "tabbed",
        id: FernNavigation.NodeId("tabbed"),
        children: [tabNode],
      };
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        true
      );
      if (productNode.child.type === "versioned") {
        productNode.child.children = [versionNode];
      }
      const root = createRootNode([productNode], "versioned");
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();

      const result = getHeaderTabs(
        foundNode,
        root,
        "test-product/v1/test-page"
      );
      expect(result).toEqual([tabNode]);
    });

    it("should return tabs from version if node not found and no product tabs", () => {
      const tabNode = createTabNode("tab1", "Tab 1");
      const versionNode = createVersionNode("v1", []);
      versionNode.child = {
        type: "tabbed",
        id: FernNavigation.NodeId("tabbed"),
        children: [tabNode],
      };
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        true
      );
      if (productNode.child.type === "versioned") {
        productNode.child.children = [versionNode];
      }
      const root = createRootNode([productNode], "versioned");
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();

      const result = getHeaderTabs(
        foundNode,
        root,
        "test-product/v1/test-page"
      );
      expect(result).toEqual([tabNode]);
    });

    it("should return null if no tabs are available", () => {
      const productNode = createProductNode(
        "test-product",
        "Test Product",
        false,
        {
          type: "unversioned",
          id: NodeId("unversioned"),
          landingPage: undefined,
          child: {
            type: "sidebarRoot",
            id: NodeId("sidebarRoot"),
            children: [],
          },
        }
      );
      const root = createRootNode([productNode], "productgroup");
      const foundNode: FernNavigation.utils.Node = createNotFoundNode();

      const result = getHeaderTabs(foundNode, root, "test-product/test-page");
      expect(result).toBeNull();
    });
  });
});
