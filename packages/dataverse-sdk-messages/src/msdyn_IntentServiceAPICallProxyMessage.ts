import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IntentServiceAPICallProxy request message
 *
 * Web API Action: msdyn_IntentServiceAPICallProxy
 */
export class msdyn_IntentServiceAPICallProxyRequest
  extends OrganizationRequest
  implements Executable<msdyn_IntentServiceAPICallProxyResponse>
{
  constructor(
    public intentServiceEntityType: string,
    public intentServiceRequestPayload: string,
    public intentServiceRequestPayloadForTelemetry: string
  ) {
    super("msdyn_IntentServiceAPICallProxy");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IntentServiceAPICallProxyResponse> {
    const data = await response.json();
    return msdyn_IntentServiceAPICallProxyResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IntentServiceEntityType: this.intentServiceEntityType,
      IntentServiceRequestPayload: this.intentServiceRequestPayload,
      IntentServiceRequestPayloadForTelemetry: this.intentServiceRequestPayloadForTelemetry,
    };
  }
}

/**
 * msdyn_IntentServiceAPICallProxy response message
 */
export class msdyn_IntentServiceAPICallProxyResponse extends OrganizationResponse {
  constructor(public result: msdyn_IntentServiceAPICallProxyResponse) {
    super("msdyn_IntentServiceAPICallProxy");
  }

  static fromResponse(data: unknown): msdyn_IntentServiceAPICallProxyResponse {
    return new msdyn_IntentServiceAPICallProxyResponse((data as any).value);
  }
}
