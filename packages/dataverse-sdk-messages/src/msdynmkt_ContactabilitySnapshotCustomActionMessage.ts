import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_ContactabilitySnapshotCustomActionResponse as msdynmkt_ContactabilitySnapshotCustomActionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdynmkt_ContactabilitySnapshotCustomActionResponse.fromResponse({});
    return msdynmkt_ContactabilitySnapshotCustomActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_ContactabilitySnapshotCustomAction response message
 */
export class msdynmkt_ContactabilitySnapshotCustomActionResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_ContactabilitySnapshotCustomActionResponseData) {
    super("msdynmkt_ContactabilitySnapshotCustomAction");
  }

  static fromResponse(data: unknown): msdynmkt_ContactabilitySnapshotCustomActionResponse {
    return new msdynmkt_ContactabilitySnapshotCustomActionResponse(
      responseObject<msdynmkt_ContactabilitySnapshotCustomActionResponseData>(data)
    );
  }
}
