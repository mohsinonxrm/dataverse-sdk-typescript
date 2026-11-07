import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IntentQuickSetupProxy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IntentQuickSetupProxyRequestParameters {
  IntentQuickSetupEndpoint: string;
  IntentQuickSetupRequest: string;
}

/**
 * msdyn_IntentQuickSetupProxy request message
 *
 * Web API Action: msdyn_IntentQuickSetupProxy
 */
export class msdyn_IntentQuickSetupProxyRequest
  extends OrganizationRequest
  implements Executable<msdyn_IntentQuickSetupProxyResponse>
{
  declare readonly Parameters: Readonly<msdyn_IntentQuickSetupProxyRequestParameters>;

  constructor(parameters: msdyn_IntentQuickSetupProxyRequestParameters) {
    super("msdyn_IntentQuickSetupProxy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IntentQuickSetupProxy`;

    const body = requestBody({
      IntentQuickSetupEndpoint: this.Parameters.IntentQuickSetupEndpoint,
      IntentQuickSetupRequest: this.Parameters.IntentQuickSetupRequest,
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

  async parseResponse(response: Response): Promise<msdyn_IntentQuickSetupProxyResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IntentQuickSetupProxyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IntentQuickSetupProxy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IntentQuickSetupProxyResult {
  "@odata.context"?: string;
  IntentQuickSetupResponse: string;
}

/**
 * msdyn_IntentQuickSetupProxy response message
 *
 * `result` is the value the msdyn_IntentQuickSetupProxy action returns (see {@link msdyn_IntentQuickSetupProxyResult}).
 */
export class msdyn_IntentQuickSetupProxyResponse extends OrganizationResponse {
  constructor(public result: msdyn_IntentQuickSetupProxyResult) {
    super("msdyn_IntentQuickSetupProxy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IntentQuickSetupProxyResponse {
    return new msdyn_IntentQuickSetupProxyResponse(data as msdyn_IntentQuickSetupProxyResult);
  }
}
