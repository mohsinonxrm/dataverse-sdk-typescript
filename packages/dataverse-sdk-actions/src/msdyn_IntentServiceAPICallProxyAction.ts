import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_IntentServiceAPICallProxy action
 */
export interface msdyn_IntentServiceAPICallProxyResponse {
  IntentServiceResponsePayload: string;
}

/**
 * Parameters of the msdyn_IntentServiceAPICallProxy action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IntentServiceAPICallProxyActionParameters {
  IntentServiceRequestPayloadForTelemetry: string;
  IntentServiceRequestPayload?: string;
  IntentServiceEntityType?: string;
}

/**
 * msdyn_IntentServiceAPICallProxy action
 *
 * Unbound action
 */
export class msdyn_IntentServiceAPICallProxyAction implements Executable<msdyn_IntentServiceAPICallProxyResponse> {
  constructor(public readonly parameters: msdyn_IntentServiceAPICallProxyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IntentServiceAPICallProxy`;

    const body = requestBody({
      IntentServiceRequestPayloadForTelemetry:
        this.parameters.IntentServiceRequestPayloadForTelemetry,
      IntentServiceRequestPayload: this.parameters.IntentServiceRequestPayload,
      IntentServiceEntityType: this.parameters.IntentServiceEntityType,
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

  async parseResponse(response: Response): Promise<msdyn_IntentServiceAPICallProxyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IntentServiceAPICallProxyResponse;
    return (await response.json()) as msdyn_IntentServiceAPICallProxyResponse;
  }
}
