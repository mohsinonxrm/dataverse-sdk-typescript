import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IntentQuickSetupProxy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IntentQuickSetupProxyResponse {
  "@odata.context"?: string;
  IntentQuickSetupResponse: string;
}

/**
 * Parameters of the msdyn_IntentQuickSetupProxy action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IntentQuickSetupProxyActionParameters {
  IntentQuickSetupEndpoint: string;
  IntentQuickSetupRequest: string;
}

/**
 * msdyn_IntentQuickSetupProxy action
 *
 * Unbound action
 */
export class msdyn_IntentQuickSetupProxyAction implements Executable<msdyn_IntentQuickSetupProxyResponse> {
  constructor(public readonly parameters: msdyn_IntentQuickSetupProxyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IntentQuickSetupProxy`;

    const body = requestBody({
      IntentQuickSetupEndpoint: this.parameters.IntentQuickSetupEndpoint,
      IntentQuickSetupRequest: this.parameters.IntentQuickSetupRequest,
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
    return (await response.json()) as msdyn_IntentQuickSetupProxyResponse;
  }
}
