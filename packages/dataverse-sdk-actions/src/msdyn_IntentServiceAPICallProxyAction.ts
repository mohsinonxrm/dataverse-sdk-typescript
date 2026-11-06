import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_IntentServiceAPICallProxy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IntentServiceAPICallProxyResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IntentServiceAPICallProxyResponse;
  }
}
