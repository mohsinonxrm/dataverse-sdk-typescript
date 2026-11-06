import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ResolveTimezone action
 */
export interface msdyn_ResolveTimezoneResponse {
  TimezoneData: string;
}

/**
 * Parameters of the msdyn_ResolveTimezone action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveTimezoneActionParameters {
  RequirementIds: string;
  UserId: string;
}

/**
 * msdyn_ResolveTimezone action
 *
 * Unbound action
 */
export class msdyn_ResolveTimezoneAction implements Executable<msdyn_ResolveTimezoneResponse> {
  constructor(public readonly parameters: msdyn_ResolveTimezoneActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveTimezone`;

    const body = requestBody({
      RequirementIds: this.parameters.RequirementIds,
      UserId: this.parameters.UserId,
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

  async parseResponse(response: Response): Promise<msdyn_ResolveTimezoneResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ResolveTimezoneResponse;
    return (await response.json()) as msdyn_ResolveTimezoneResponse;
  }
}
