import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SendMessageToOCServiceResponse> {
    const data = await response.json();
    return msdyn_SendMessageToOCServiceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ServiceEndPoint: this.serviceEndPoint,
      RequestBody: this.requestBody,
    };
  }
}

/**
 * msdyn_SendMessageToOCService response message
 */
export class msdyn_SendMessageToOCServiceResponse extends OrganizationResponse {
  constructor(public result: msdyn_SendMessageToOCServiceResponse) {
    super("msdyn_SendMessageToOCService");
  }

  static fromResponse(data: unknown): msdyn_SendMessageToOCServiceResponse {
    return new msdyn_SendMessageToOCServiceResponse((data as any).value);
  }
}
