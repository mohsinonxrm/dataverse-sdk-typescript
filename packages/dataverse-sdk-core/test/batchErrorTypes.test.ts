import { describe, expectTypeOf, it } from "vitest";
import { DataverseBatchError } from "../src/index.js";

describe("#294: DataverseBatchError has no any defaults", () => {
  it("defaults result and step to unknown", () => {
    expectTypeOf<DataverseBatchError["result"]>().toEqualTypeOf<unknown>();
    expectTypeOf<DataverseBatchError["requestErrors"]>().toEqualTypeOf<Map<string, unknown>>();
  });

  it("keeps explicit type arguments", () => {
    type Step = { status: number };
    expectTypeOf<DataverseBatchError<{ ok: boolean }, Step>["requestErrors"]>().toEqualTypeOf<
      Map<string, Step>
    >();
  });
});
