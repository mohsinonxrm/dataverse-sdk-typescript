import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OCResetLastMessageInfo action
 */
export interface msdyn_OCResetLastMessageInfoResponse {
  ResponseData: string;
}

/**
 * Parameters of the msdyn_OCResetLastMessageInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OCResetLastMessageInfoActionParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_OCResetLastMessageInfo action
 *
 * Unbound action
 */
export class msdyn_OCResetLastMessageInfoAction implements Executable<msdyn_OCResetLastMessageInfoResponse> {
  constructor(public readonly parameters: msdyn_OCResetLastMessageInfoActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetLastMessageInfo`;

    const body = requestBody({
      LiveWorkItemId: this.parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_OCResetLastMessageInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OCResetLastMessageInfoResponse;
    return (await response.json()) as msdyn_OCResetLastMessageInfoResponse;
  }
}
