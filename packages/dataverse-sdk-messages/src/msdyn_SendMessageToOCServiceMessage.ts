import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SendMessageToOCServiceResponse as msdyn_SendMessageToOCServiceResponseData } from "./types/index.js";

/**
 * msdyn_SendMessageToOCService request message
 *
 * Web API Action: msdyn_SendMessageToOCService
 */
export class msdyn_SendMessageToOCServiceRequest
  extends OrganizationRequest
  implements Executable<msdyn_SendMessageToOCServiceResponse>
{
  constructor(
    public serviceEndPoint: string,
    public requestBody: string
  ) {
    super("msdyn_SendMessageToOCService");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SendMessageToOCService`;

    const body: Record<string, unknown> = {
      ServiceEndPoint: this.serviceEndPoint,
      RequestBody: this.requestBody,
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

  async parseResponse(response: Response): Promise<msdyn_SendMessageToOCServiceResponse> {
    const data = await response.json();
    return msdyn_SendMessageToOCServiceResponse.fromResponse(data);
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
