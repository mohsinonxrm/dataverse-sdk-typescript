import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SendMessageToOCService message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SendMessageToOCServiceRequestParameters {
  ServiceEndPoint: string;
  RequestBody: string;
}

/**
 * msdyn_SendMessageToOCService request message
 *
 * Web API Action: msdyn_SendMessageToOCService
 */
export class msdyn_SendMessageToOCServiceRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendMessageToOCServiceResponse>
{
  declare readonly Parameters: Readonly<msdyn_SendMessageToOCServiceRequestParameters>;

  constructor(parameters: msdyn_SendMessageToOCServiceRequestParameters) {
    super("msdyn_SendMessageToOCService", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendMessageToOCService`;

    const body = requestBody({
      ServiceEndPoint: this.Parameters.ServiceEndPoint,
      RequestBody: this.Parameters.RequestBody,
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

  async parseResponse(response: Response): Promise<msdyn_SendMessageToOCServiceResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SendMessageToOCServiceResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SendMessageToOCService action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SendMessageToOCServiceResult {
  "@odata.context"?: string;
  ResponseBody: string;
}

/**
 * msdyn_SendMessageToOCService response message
 *
 * `result` is the value the msdyn_SendMessageToOCService action returns (see {@link msdyn_SendMessageToOCServiceResult}).
 */
export class msdyn_SendMessageToOCServiceResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendMessageToOCServiceResult) {
    super("msdyn_SendMessageToOCService");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SendMessageToOCServiceResponse {
    return new msdyn_SendMessageToOCServiceResponse(data as msdyn_SendMessageToOCServiceResult);
  }
}
