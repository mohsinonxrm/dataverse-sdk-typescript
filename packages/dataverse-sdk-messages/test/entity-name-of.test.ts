/**
 * The FetchXML table name is read without a backtracking pattern over the whole query (CodeQL:
 * polynomial regular expression on uncontrolled data).
 */
import { describe, expect, it } from "vitest";
import { entityNameOf } from "../src/handwritten/RetrieveMultipleMessage.js";

describe("entityNameOf", () => {
  it("reads the first entity's name, in either quote style", () => {
    expect(
      entityNameOf(`<fetch><entity name="account"><attribute name="name"/></entity></fetch>`)
    ).toBe("account");
    expect(entityNameOf(`<fetch top='5'><entity  name = 'contact' ></entity></fetch>`)).toBe(
      "contact"
    );
    expect(entityNameOf(`<FETCH><ENTITY NAME="lead"/></FETCH>`)).toBe("lead");
  });

  it("skips link-entity and look-alike tags", () => {
    expect(
      entityNameOf(
        `<fetch><entityx name="no"/><entity name="account"><link-entity name="contact"/></entity></fetch>`
      )
    ).toBe("account");
  });

  it("returns undefined when there is no entity name", () => {
    expect(entityNameOf("<fetch />")).toBeUndefined();
    expect(entityNameOf(`<fetch><entity alias="a"></entity></fetch>`)).toBeUndefined();
    expect(entityNameOf(`<fetch><entity name=""></entity></fetch>`)).toBeUndefined();
    expect(entityNameOf("<fetch><entity name='x'")).toBeUndefined();
  });

  it("stays linear on hostile input", () => {
    const hostile = "<entity ".repeat(50_000);
    const start = Date.now();
    expect(entityNameOf(hostile)).toBeUndefined();
    expect(Date.now() - start).toBeLessThan(500);
  });
});
