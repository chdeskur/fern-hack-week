import { toTree } from "../parse";
import { makeToc } from "../toc";

describe("toc", () => {
  it("should create a toc", () => {
    const toc = makeToc(toTree(`# Hello world`).hast);
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [],
      },
    ]);
  });

  it("should create a toc with a nested heading", () => {
    const toc = makeToc(toTree(`# Hello world\n\n## Nested heading`).hast);
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [
          {
            simpleString: "Nested heading",
            anchorString: "nested-heading",
            children: [],
          },
        ],
      },
    ]);
  });

  it("should respect maxDepth of 2", () => {
    const toc = makeToc(
      toTree(`# Hello world\n\n## Nested heading\n\n### Deep heading`).hast,
      false,
      2
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [
          {
            simpleString: "Nested heading",
            anchorString: "nested-heading",
            children: [],
          },
        ],
      },
    ]);
  });

  it("should respect complex toc with maxDepth of 2", () => {
    const toc = makeToc(
      toTree(
        `# Hello world\n\n## Nested heading\n\n### Deep heading\n\n### Another Deep heading\n\n## Nested heading 2\n\n### Deep heading 2\n\n### Another Deep heading 2`
      ).hast,
      false,
      2
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [
          {
            simpleString: "Nested heading",
            anchorString: "nested-heading",
            children: [],
          },
          {
            simpleString: "Nested heading 2",
            anchorString: "nested-heading-2",
            children: [],
          },
        ],
      },
    ]);
  });

  it("should respect complex toc", () => {
    const toc = makeToc(
      toTree(
        `# Hello world\n\n## Nested heading\n\n### Deep heading\n\n### Another Deep heading\n\n## Nested heading 2\n\n### Deep heading 2\n\n### Another Deep heading 2`
      ).hast
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [
          {
            simpleString: "Nested heading",
            anchorString: "nested-heading",
            children: [
              {
                simpleString: "Deep heading",
                anchorString: "deep-heading",
                children: [],
                featureFlags: undefined,
              },
              {
                simpleString: "Another Deep heading",
                anchorString: "another-deep-heading",
                children: [],
                featureFlags: undefined,
              },
            ],
          },
          {
            simpleString: "Nested heading 2",
            anchorString: "nested-heading-2",
            children: [
              {
                simpleString: "Deep heading 2",
                anchorString: "deep-heading-2",
                children: [],
              },
              {
                simpleString: "Another Deep heading 2",
                anchorString: "another-deep-heading-2",
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("should respect varied complex toc", () => {
    const toc = makeToc(
      toTree(
        `#### Skip Level 4\n\n## Include Level 2\n\n### Include Level 3\n\n##### Skip Nested 5\n\n#### Skip Nested 4\n\n### Regular 3\n\n## Regular 2\n\n### Last 3\n\n#### Skip Last 4`
      ).hast
    );
    expect(toc).toEqual([
      {
        simpleString: "Skip Level 4",
        anchorString: "skip-level-4",
        children: [],
      },
      {
        simpleString: "Include Level 2",
        anchorString: "include-level-2",
        children: [
          {
            simpleString: "Include Level 3",
            anchorString: "include-level-3",
            children: [
              {
                simpleString: "Skip Nested 5",
                anchorString: "skip-nested-5",
                children: [],
              },
              {
                simpleString: "Skip Nested 4",
                anchorString: "skip-nested-4",
                children: [],
              },
            ],
          },
          {
            simpleString: "Regular 3",
            anchorString: "regular-3",
            children: [],
          },
        ],
      },
      {
        simpleString: "Regular 2",
        anchorString: "regular-2",
        children: [
          {
            simpleString: "Last 3",
            anchorString: "last-3",
            children: [
              {
                simpleString: "Skip Last 4",
                anchorString: "skip-last-4",
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("should respect varied complex toc with maxDepth of 3", () => {
    const toc = makeToc(
      toTree(
        `#### Skip Level 4\n\n## Include Level 2\n\n### Include Level 3\n\n##### Skip Nested 5\n\n#### Skip Nested 4\n\n### Regular 3\n\n## Regular 2\n\n### Last 3\n\n#### Skip Last 4`
      ).hast,
      false,
      3
    );
    expect(toc).toEqual([
      {
        simpleString: "Include Level 2",
        anchorString: "include-level-2",
        children: [
          {
            simpleString: "Include Level 3",
            anchorString: "include-level-3",
            children: [],
          },
          {
            simpleString: "Regular 3",
            anchorString: "regular-3",
            children: [],
          },
        ],
      },
      {
        simpleString: "Regular 2",
        anchorString: "regular-2",
        children: [
          {
            simpleString: "Last 3",
            anchorString: "last-3",
            children: [],
          },
        ],
      },
    ]);
  });

  it("should create a toc with feature flags", () => {
    const toc = makeToc(
      toTree(
        `<Feature flag="test" fallbackValue="false" match="true">\n# Hello world\n</Feature>`
      ).hast
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        featureFlags: [
          {
            flag: "test",
            fallbackValue: "false",
            match: "true",
          },
        ],
        children: [],
      },
    ]);
  });

  it("should accept string literals wrapped in expressions", () => {
    const toc = makeToc(
      toTree(
        `<Feature flag="test" fallbackValue={"false"} match={"true"}>\n# Hello world\n</Feature>`
      ).hast
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [],
        featureFlags: [
          {
            flag: "test",
            fallbackValue: "false",
            match: "true",
          },
        ],
      },
    ]);
  });

  it("should accept boolean literals wrapped in expressions", () => {
    const toc = makeToc(
      toTree(
        `<Feature flag="test" fallbackValue={true} match={false}>\n# Hello world\n</Feature>`
      ).hast
    );
    expect(toc).toEqual([
      {
        simpleString: "Hello world",
        anchorString: "hello-world",
        children: [],
        featureFlags: [
          {
            flag: "test",
            fallbackValue: true,
            match: false,
          },
        ],
      },
    ]);
  });
});
