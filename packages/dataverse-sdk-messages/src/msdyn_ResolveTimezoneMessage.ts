import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ResolveTimezone message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResolveTimezoneRequestParameters {
  RequirementIds: string;
  UserId: string;
}

/**
 * msdyn_ResolveTimezone request message
 *
 * Web API Action: msdyn_ResolveTimezone
 */
export class msdyn_ResolveTimezoneRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResolveTimezoneResponse>
{
  declare readonly Parameters: Readonly<msdyn_ResolveTimezoneRequestParameters>;

  constructor(parameters: msdyn_ResolveTimezoneRequestParameters) {
    super("msdyn_ResolveTimezone", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveTimezone`;

    const body = requestBody({
      RequirementIds: this.Parameters.RequirementIds,
      UserId: this.Parameters.UserId,
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
    return msdyn_ResolveTimezoneResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ResolveTimezone action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ResolveTimezoneResult {
  "@odata.context"?: string;
  TimezoneData: string;
}

/**
 * msdyn_ResolveTimezone response message
 *
 * `result` is the value the msdyn_ResolveTimezone action returns (see {@link msdyn_ResolveTimezoneResult}).
 */
export class msdyn_ResolveTimezoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ResolveTimezoneResult) {
    super("msdyn_ResolveTimezone");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ResolveTimezoneResponse {
    return new msdyn_ResolveTimezoneResponse(data as msdyn_ResolveTimezoneResult);
  }
}
