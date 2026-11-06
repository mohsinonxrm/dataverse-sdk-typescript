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
  IntentServiceEntityType?: string;
  IntentServiceRequestPayload?: string;
  IntentServiceRequestPayloadForTelemetry: string;
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
      IntentServiceEntityType: this.parameters.IntentServiceEntityType,
      IntentServiceRequestPayload: this.parameters.IntentServiceRequestPayload,
      IntentServiceRequestPayloadForTelemetry:
        this.parameters.IntentServiceRequestPayloadForTelemetry,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_IntentServiceAPICallProxyResponse;
  }
}
