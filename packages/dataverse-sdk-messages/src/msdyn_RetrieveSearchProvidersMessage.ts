import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveSearchProviders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveSearchProvidersRequestParameters {
  ApplicationId?: string;
}

/**
 * msdyn_RetrieveSearchProviders request message
 *
 * Web API Action: msdyn_RetrieveSearchProviders
 */
export class msdyn_RetrieveSearchProvidersRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveSearchProvidersResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveSearchProvidersRequestParameters>;

  constructor(parameters: msdyn_RetrieveSearchProvidersRequestParameters = {}) {
    super("msdyn_RetrieveSearchProviders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveSearchProviders`;

    const body = requestBody({
      ApplicationId: this.Parameters.ApplicationId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveSearchProvidersResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveSearchProvidersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveSearchProviders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveSearchProvidersResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveSearchProviders response message
 *
 * `result` is the value the msdyn_RetrieveSearchProviders action returns (see {@link msdyn_RetrieveSearchProvidersResult}).
 */
export class msdyn_RetrieveSearchProvidersResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveSearchProvidersResult) {
    super("msdyn_RetrieveSearchProviders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveSearchProvidersResponse {
    return new msdyn_RetrieveSearchProvidersResponse(data as msdyn_RetrieveSearchProvidersResult);
  }
}
