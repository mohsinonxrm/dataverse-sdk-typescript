import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_OCResetInviteParamsInfo action
 */
export interface msdyn_OCResetInviteParamsInfoResponse {
  ResponseData: string;
}

/**
 * Parameters of the msdyn_OCResetInviteParamsInfo action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OCResetInviteParamsInfoActionParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_OCResetInviteParamsInfo action
 *
 * Unbound action
 */
export class msdyn_OCResetInviteParamsInfoAction implements Executable<msdyn_OCResetInviteParamsInfoResponse> {
  constructor(public readonly parameters: msdyn_OCResetInviteParamsInfoActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OCResetInviteParamsInfo`;

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

  async parseResponse(response: Response): Promise<msdyn_OCResetInviteParamsInfoResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_OCResetInviteParamsInfoResponse;
    return (await response.json()) as msdyn_OCResetInviteParamsInfoResponse;
  }
}
