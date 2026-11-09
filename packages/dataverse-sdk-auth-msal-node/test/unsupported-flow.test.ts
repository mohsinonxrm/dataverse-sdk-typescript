/**
 * @fileoverview #294: a flow TypeScript doesn't know (a JavaScript caller, or a cast) is refused
 * by `getToken()` with the flow it was given in the message.
 */

import { describe, expect, it } from "vitest";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DataverseInvalidRequestError } from "@mohsinonxrm/dataverse-sdk-core";
import { MsalNodeTokenProvider, type MsalNodeTokenProviderOptions } from "../src/index.js";

describe("MsalNodeTokenProvider with an unsupported flow", () => {
  it("rejects getToken() and names the flow", async () => {
    const cca = new ConfidentialClientApplication({
      auth: {
        clientId: "22222222-2222-2222-2222-222222222222",
        authority: "https://login.microsoftonline.com/11111111-1111-1111-1111-111111111111",
        clientSecret: "not-a-secret",
      },
    });
    const options = {
      flow: "onBehalfOf",
      scopes: ["https://contoso.crm.dynamics.com/.default"],
    } as unknown as MsalNodeTokenProviderOptions;
    const provider = new MsalNodeTokenProvider(cca, options);

    const error: unknown = await provider.getToken().catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DataverseInvalidRequestError);
    expect((error as Error).message).toContain("Unsupported flow: onBehalfOf");
  });
});
