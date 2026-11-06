import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SendMessageToOCServiceResponse as msdyn_SendMessageToOCServiceResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SendMessageToOCServiceResponse.fromResponse({});
    return msdyn_SendMessageToOCServiceResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SendMessageToOCService response message
 */
export class msdyn_SendMessageToOCServiceResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendMessageToOCServiceResponseData) {
    super("msdyn_SendMessageToOCService");
  }

  static fromResponse(data: unknown): msdyn_SendMessageToOCServiceResponse {
    return new msdyn_SendMessageToOCServiceResponse(
      responseObject<msdyn_SendMessageToOCServiceResponseData>(data)
    );
  }
}
