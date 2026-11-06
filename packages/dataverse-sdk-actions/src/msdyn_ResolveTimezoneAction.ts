import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ResolveTimezone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ResolveTimezoneResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ResolveTimezoneResponse;
  }
}
