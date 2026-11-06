import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_IntentServiceAPICallProxyResponse as msdyn_IntentServiceAPICallProxyResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_IntentServiceAPICallProxy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IntentServiceAPICallProxyRequestParameters {
  IntentServiceEntityType?: string;
  IntentServiceRequestPayload?: string;
  IntentServiceRequestPayloadForTelemetry: string;
}

/**
 * msdyn_IntentServiceAPICallProxy request message
 *
 * Web API Action: msdyn_IntentServiceAPICallProxy
 */
export class msdyn_IntentServiceAPICallProxyRequest
  extends OrganizationRequest
  implements Executable<msdyn_IntentServiceAPICallProxyResponse>
{
  declare readonly Parameters: Readonly<msdyn_IntentServiceAPICallProxyRequestParameters>;

  constructor(parameters: msdyn_IntentServiceAPICallProxyRequestParameters) {
    super("msdyn_IntentServiceAPICallProxy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IntentServiceAPICallProxy`;

    const body = requestBody({
      IntentServiceEntityType: this.Parameters.IntentServiceEntityType,
      IntentServiceRequestPayload: this.Parameters.IntentServiceRequestPayload,
      IntentServiceRequestPayloadForTelemetry:
        this.Parameters.IntentServiceRequestPayloadForTelemetry,
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
    return msdyn_IntentServiceAPICallProxyResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_IntentServiceAPICallProxy response message
 */
export class msdyn_IntentServiceAPICallProxyResponse extends OrganizationResponse {
  constructor(public result: msdyn_IntentServiceAPICallProxyResponseData) {
    super("msdyn_IntentServiceAPICallProxy");
  }

  static fromResponse(data: unknown): msdyn_IntentServiceAPICallProxyResponse {
    return new msdyn_IntentServiceAPICallProxyResponse(
      responseObject<msdyn_IntentServiceAPICallProxyResponseData>(data)
    );
  }
}
