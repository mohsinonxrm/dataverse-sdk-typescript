import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InitiateCCaaSAPIsAsync action
 */
export interface msdyn_InitiateCCaaSAPIsAsyncResponse {
  msdyn_InitiateCCaaSAPIsAsyncResponse: string;
}

/**
 * Parameters of the msdyn_InitiateCCaaSAPIsAsync action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InitiateCCaaSAPIsAsyncActionParameters {
  Payload: string;
  LiveWorkItemId: string;
  CCaaSAPI: string;
  InitiatingUser: string;
}

/**
 * msdyn_InitiateCCaaSAPIsAsync action
 *
 * Unbound action
 */
export class msdyn_InitiateCCaaSAPIsAsyncAction implements Executable<msdyn_InitiateCCaaSAPIsAsyncResponse> {
  constructor(public readonly parameters: msdyn_InitiateCCaaSAPIsAsyncActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InitiateCCaaSAPIsAsync`;

    const body = requestBody({
      Payload: this.parameters.Payload,
      LiveWorkItemId: this.parameters.LiveWorkItemId,
      CCaaSAPI: this.parameters.CCaaSAPI,
      InitiatingUser: this.parameters.InitiatingUser,
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

  async parseResponse(response: Response): Promise<msdyn_InitiateCCaaSAPIsAsyncResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_InitiateCCaaSAPIsAsyncResponse;
    return (await response.json()) as msdyn_InitiateCCaaSAPIsAsyncResponse;
  }
}
