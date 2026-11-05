import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SendMessageToOCService action
 */
export interface msdyn_SendMessageToOCServiceResponse {
  ResponseBody: string;
}

/**
 * msdyn_SendMessageToOCService action
 *
 * Unbound action
 */
export class msdyn_SendMessageToOCServiceAction implements Executable<msdyn_SendMessageToOCServiceResponse> {
  constructor(
    public readonly serviceEndPoint: string,
    public readonly requestBody: string
  ) {}

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
    return data as msdyn_SendMessageToOCServiceResponse;
  }
}
