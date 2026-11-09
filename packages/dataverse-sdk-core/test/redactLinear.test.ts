import { describe, expect, it } from "vitest";
import { defaultRedactUrl } from "../src/utils/redact.js";

const API = "https://contoso.crm.dynamics.com/api/data/v9.2";
const ID = "00000000-0000-0000-0000-000000000001";

describe("defaultRedactUrl: linear time and same results (CodeQL js/polynomial-redos)", () => {
  it.each([
    [`${API}/accounts(${ID})`, `${API}/accounts({id})`],
    [
      `${API}/accounts(${ID})/contact_customer_accounts(${ID})`,
      `${API}/accounts({id})/contact_customer_accounts({id})`,
    ],
    [`${API}/accounts(name='O''Brien')`, `${API}/accounts(…)`],
    [`${API}/accounts(name='a(b)')`, `${API}/accounts(…)`],
    [`${API}/accounts(%7B${ID}%7D)`, `${API}/accounts({id})`],
    [`${API}/RetrieveVersion()`, `${API}/RetrieveVersion(…)`],
    [`${API}/accounts(`, `${API}/accounts(`],
    [`${API}/WhoAmI?x=1`, `${API}/WhoAmI?…`],
  ])("%s", (input, expected) => {
    expect(defaultRedactUrl(new URL(input))).toBe(expected);
  });

  it("stays fast on a pathological path", () => {
    const evil = new URL(`${API}/${"(.".repeat(50_000)}`);
    const start = performance.now();
    defaultRedactUrl(evil);
    expect(performance.now() - start).toBeLessThan(200);
  });
});
