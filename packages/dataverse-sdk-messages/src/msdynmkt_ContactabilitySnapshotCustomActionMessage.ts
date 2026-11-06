import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_ContactabilitySnapshotCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionRequestParameters {
  Input?: string;
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction request message
 *
 * Web API Action: msdynmkt_ContactabilitySnapshotCustomAction
 */
export class msdynmkt_ContactabilitySnapshotCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_ContactabilitySnapshotCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_ContactabilitySnapshotCustomActionRequestParameters>;

  constructor(parameters: msdynmkt_ContactabilitySnapshotCustomActionRequestParameters = {}) {
    super("msdynmkt_ContactabilitySnapshotCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ContactabilitySnapshotCustomAction`;

    const body = requestBody({
      Input: this.Parameters.Input,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_ContactabilitySnapshotCustomActionResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_ContactabilitySnapshotCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_ContactabilitySnapshotCustomAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ContactabilitySnapshotCustomActionResult {
  "@odata.context"?: string;
  Output: string;
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction response message
 *
 * `result` is the value the msdynmkt_ContactabilitySnapshotCustomAction action returns (see {@link msdynmkt_ContactabilitySnapshotCustomActionResult}).
 */
export class msdynmkt_ContactabilitySnapshotCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ContactabilitySnapshotCustomActionResult) {
    super("msdynmkt_ContactabilitySnapshotCustomAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_ContactabilitySnapshotCustomActionResponse {
    return new msdynmkt_ContactabilitySnapshotCustomActionResponse(
      data as msdynmkt_ContactabilitySnapshotCustomActionResult
    );
  }
}
