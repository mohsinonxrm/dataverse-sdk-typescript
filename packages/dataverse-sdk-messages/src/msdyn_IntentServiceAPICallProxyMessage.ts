import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_IntentServiceAPICallProxy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IntentServiceAPICallProxyRequestParameters {
  IntentServiceRequestPayloadForTelemetry: string;
  IntentServiceRequestPayload?: string;
  IntentServiceEntityType?: string;
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
      IntentServiceRequestPayloadForTelemetry:
        this.Parameters.IntentServiceRequestPayloadForTelemetry,
      IntentServiceRequestPayload: this.Parameters.IntentServiceRequestPayload,
      IntentServiceEntityType: this.Parameters.IntentServiceEntityType,
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
    return msdyn_IntentServiceAPICallProxyResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IntentServiceAPICallProxy action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IntentServiceAPICallProxyResult {
  "@odata.context"?: string;
  IntentServiceResponsePayload: string;
}

/**
 * msdyn_IntentServiceAPICallProxy response message
 *
 * `result` is the value the msdyn_IntentServiceAPICallProxy action returns (see {@link msdyn_IntentServiceAPICallProxyResult}).
 */
export class msdyn_IntentServiceAPICallProxyResponse extends OrganizationResponse {
  constructor(public result: msdyn_IntentServiceAPICallProxyResult) {
    super("msdyn_IntentServiceAPICallProxy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IntentServiceAPICallProxyResponse {
    return new msdyn_IntentServiceAPICallProxyResponse(
      data as msdyn_IntentServiceAPICallProxyResult
    );
  }
}
