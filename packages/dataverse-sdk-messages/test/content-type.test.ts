/**
 * #23: generated messages declare their JSON body with a lower-case `content-type`, the casing the
 * core uses, so exactly one content type is sent.
 */
import { describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import * as messages from "../src/index.js";

type MessageClass = new (...args: unknown[]) => Executable<unknown>;

const messageClasses = Object.entries(messages).filter(
  (entry): entry is [string, MessageClass] =>
    entry[0].endsWith("Request") &&
    entry[0] !== "OrganizationRequest" &&
    typeof entry[1] === "function"
);

describe("#23: generated messages send one lower-case content-type", () => {
  it("finds the generated message classes", () => {
    expect(messageClasses.length).toBeGreaterThan(1000);
  });

  it("every message's request declares only a lower-case content-type header", () => {
    const offenders: string[] = [];
    for (const [name, Message] of messageClasses) {
      // Parameter values don't affect the headers, so construct without arguments.
      const info = new Message().toRequestInformation(
        "https://contoso.crm.dynamics.com/api/data/v9.2"
      );
      const headers = info.headers ?? {};
      const names = Object.keys(headers).filter((k) => k.toLowerCase() === "content-type");
      if (names.length !== 1 || names[0] !== "content-type") {
        offenders.push(`${name}: ${JSON.stringify(Object.keys(headers))}`);
      } else if (headers["content-type"] !== "application/json") {
        offenders.push(`${name}: content-type=${String(headers["content-type"])}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
