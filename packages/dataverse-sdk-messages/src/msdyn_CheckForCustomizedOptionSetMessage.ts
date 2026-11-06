import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForCustomizedOptionSetResponse as msdyn_CheckForCustomizedOptionSetResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CheckForCustomizedOptionSet message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedOptionSetRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedOptionSet request message
 *
 * Web API Action: msdyn_CheckForCustomizedOptionSet
 */
export class msdyn_CheckForCustomizedOptionSetRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedOptionSetResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedOptionSetRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedOptionSetRequestParameters = {}) {
    super("msdyn_CheckForCustomizedOptionSet", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedOptionSet`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
      ExcludeSolutionIds: this.Parameters.ExcludeSolutionIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedOptionSetResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForCustomizedOptionSetResponse.fromResponse({});
    return msdyn_CheckForCustomizedOptionSetResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckForCustomizedOptionSet response message
 */
export class msdyn_CheckForCustomizedOptionSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedOptionSetResponseData) {
    super("msdyn_CheckForCustomizedOptionSet");
  }

  static fromResponse(data: unknown): msdyn_CheckForCustomizedOptionSetResponse {
    return new msdyn_CheckForCustomizedOptionSetResponse(
      responseObject<msdyn_CheckForCustomizedOptionSetResponseData>(data)
    );
  }
}
