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
  CCaaSAPI: string;
  LiveWorkItemId: string;
  InitiatingUser: string;
  Payload: string;
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
      CCaaSAPI: this.parameters.CCaaSAPI,
      LiveWorkItemId: this.parameters.LiveWorkItemId,
      InitiatingUser: this.parameters.InitiatingUser,
      Payload: this.parameters.Payload,
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
