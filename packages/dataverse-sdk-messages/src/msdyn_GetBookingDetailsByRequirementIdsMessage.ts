import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetBookingDetailsByRequirementIds request message
 *
 * Web API Action: msdyn_GetBookingDetailsByRequirementIds
 */
export class msdyn_GetBookingDetailsByRequirementIdsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetBookingDetailsByRequirementIdsResponse>
{
  constructor(
    public requirementIds: string,
    public timescale: number
  ) {
    super("msdyn_GetBookingDetailsByRequirementIds");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetBookingDetailsByRequirementIds`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetBookingDetailsByRequirementIdsResponse> {
    const data = await response.json();
    return msdyn_GetBookingDetailsByRequirementIdsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequirementIds: this.requirementIds,
      Timescale: this.timescale,
    };
  }
}

/**
 * msdyn_GetBookingDetailsByRequirementIds response message
 */
export class msdyn_GetBookingDetailsByRequirementIdsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetBookingDetailsByRequirementIdsResponse) {
    super("msdyn_GetBookingDetailsByRequirementIds");
  }

  static fromResponse(data: unknown): msdyn_GetBookingDetailsByRequirementIdsResponse {
    return new msdyn_GetBookingDetailsByRequirementIdsResponse((data as any).value);
  }
}
