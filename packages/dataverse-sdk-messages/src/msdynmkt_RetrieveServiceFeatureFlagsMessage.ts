import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_RetrieveServiceFeatureFlags message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsRequestParameters {
  ServiceName?: string;
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags request message
 *
 * Web API Action: msdynmkt_RetrieveServiceFeatureFlags
 */
export class msdynmkt_RetrieveServiceFeatureFlagsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_RetrieveServiceFeatureFlagsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_RetrieveServiceFeatureFlagsRequestParameters>;

  constructor(parameters: msdynmkt_RetrieveServiceFeatureFlagsRequestParameters = {}) {
    super("msdynmkt_RetrieveServiceFeatureFlags", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_RetrieveServiceFeatureFlags`;

    const body = requestBody({
      ServiceName: this.Parameters.ServiceName,
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

  async parseResponse(response: Response): Promise<msdynmkt_RetrieveServiceFeatureFlagsResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_RetrieveServiceFeatureFlagsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_RetrieveServiceFeatureFlags action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_RetrieveServiceFeatureFlagsResult {
  "@odata.context"?: string;
  ResultText: string;
  StatusCode: number;
}

/**
 * msdynmkt_RetrieveServiceFeatureFlags response message
 *
 * `result` is the value the msdynmkt_RetrieveServiceFeatureFlags action returns (see {@link msdynmkt_RetrieveServiceFeatureFlagsResult}).
 */
export class msdynmkt_RetrieveServiceFeatureFlagsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_RetrieveServiceFeatureFlagsResult) {
    super("msdynmkt_RetrieveServiceFeatureFlags");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_RetrieveServiceFeatureFlagsResponse {
    return new msdynmkt_RetrieveServiceFeatureFlagsResponse(
      data as msdynmkt_RetrieveServiceFeatureFlagsResult
    );
  }
}
