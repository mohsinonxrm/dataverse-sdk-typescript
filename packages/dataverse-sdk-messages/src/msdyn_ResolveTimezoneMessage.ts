import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ResolveTimezoneResponse as msdyn_ResolveTimezoneResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ResolveTimezoneResponse.fromResponse({});
    return msdyn_ResolveTimezoneResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ResolveTimezone response message
 */
export class msdyn_ResolveTimezoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ResolveTimezoneResponseData) {
    super("msdyn_ResolveTimezone");
  }

  static fromResponse(data: unknown): msdyn_ResolveTimezoneResponse {
    return new msdyn_ResolveTimezoneResponse(
      responseObject<msdyn_ResolveTimezoneResponseData>(data)
    );
  }
}
