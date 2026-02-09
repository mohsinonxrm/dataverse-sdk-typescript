import { describe, it, expect } from "vitest";
import { buildQuery } from "../src/odata/query.js";

describe("buildQuery", () => {
  it("serializes only defined values", () => {
    const q = buildQuery({ $select: "a,b", $top: 5, $filter: undefined, $count: false });
    expect(q.$select).toBe("a,b");
    expect(q.$top).toBe("5");
    expect(q.$count).toBe("false");
    expect((q as any).$filter).toBeUndefined();
  });
});
