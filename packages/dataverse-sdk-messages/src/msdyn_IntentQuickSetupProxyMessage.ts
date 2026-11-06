import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IntentQuickSetupProxyResponse as msdyn_IntentQuickSetupProxyResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_IntentQuickSetupProxyResponse.fromResponse({});
    return msdyn_IntentQuickSetupProxyResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IntentQuickSetupProxy response message
 */
export class msdyn_IntentQuickSetupProxyResponse extends OrganizationResponse {
  constructor(public result: msdyn_IntentQuickSetupProxyResponseData) {
    super("msdyn_IntentQuickSetupProxy");
  }

  static fromResponse(data: unknown): msdyn_IntentQuickSetupProxyResponse {
    return new msdyn_IntentQuickSetupProxyResponse(
      responseObject<msdyn_IntentQuickSetupProxyResponseData>(data)
    );
  }
}
