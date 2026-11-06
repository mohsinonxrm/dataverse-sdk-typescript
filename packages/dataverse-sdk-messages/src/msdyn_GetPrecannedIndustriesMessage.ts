import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetPrecannedIndustries request message
 *
 * Web API Action: msdyn_GetPrecannedIndustries
 */
export class msdyn_GetPrecannedIndustriesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPrecannedIndustriesResponse>
{
  constructor() {
    super("msdyn_GetPrecannedIndustries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPrecannedIndustries`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPrecannedIndustriesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetPrecannedIndustriesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetPrecannedIndustries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetPrecannedIndustriesResult {
  "@odata.context"?: string;
  msdyn_errormessage: string;
  msdyn_industries: string;
}

/**
 * msdyn_GetPrecannedIndustries response message
 *
 * `result` is the value the msdyn_GetPrecannedIndustries action returns (see {@link msdyn_GetPrecannedIndustriesResult}).
 */
export class msdyn_GetPrecannedIndustriesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetPrecannedIndustriesResult) {
    super("msdyn_GetPrecannedIndustries");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetPrecannedIndustriesResponse {
    return new msdyn_GetPrecannedIndustriesResponse(data as msdyn_GetPrecannedIndustriesResult);
  }
}
