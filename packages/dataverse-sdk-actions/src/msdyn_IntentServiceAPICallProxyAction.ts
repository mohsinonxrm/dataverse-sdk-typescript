import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IntentServiceAPICallProxy action
 */
export interface msdyn_IntentServiceAPICallProxyResponse {
  IntentServiceResponsePayload: string;
}

/**
 * msdyn_IntentServiceAPICallProxy action
 *
 * Unbound action
 */
export class msdyn_IntentServiceAPICallProxyAction implements Executable<msdyn_IntentServiceAPICallProxyResponse> {
  constructor(
    public readonly intentServiceEntityType: string | undefined,
    public readonly intentServiceRequestPayload: string | undefined,
    public readonly intentServiceRequestPayloadForTelemetry: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IntentServiceAPICallProxy`;

    const body: Record<string, unknown> = {
      IntentServiceEntityType: this.intentServiceEntityType,
      IntentServiceRequestPayload: this.intentServiceRequestPayload,
      IntentServiceRequestPayloadForTelemetry: this.intentServiceRequestPayloadForTelemetry,
    };

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
    const data = await response.json();
    return data as msdyn_IntentServiceAPICallProxyResponse;
  }
}
