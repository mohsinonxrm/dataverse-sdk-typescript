import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForDeletedWebResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedWebResourcesRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForDeletedWebResources request message
 *
 * Web API Action: msdyn_CheckForDeletedWebResources
 */
export class msdyn_CheckForDeletedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedWebResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDeletedWebResourcesRequestParameters>;

  constructor(parameters: msdyn_CheckForDeletedWebResourcesRequestParameters = {}) {
    super("msdyn_CheckForDeletedWebResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedWebResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForDeletedWebResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForDeletedWebResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForDeletedWebResourcesResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForDeletedWebResources response message
 *
 * `result` is the value the msdyn_CheckForDeletedWebResources action returns (see {@link msdyn_CheckForDeletedWebResourcesResult}).
 */
export class msdyn_CheckForDeletedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedWebResourcesResult) {
    super("msdyn_CheckForDeletedWebResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForDeletedWebResourcesResponse {
    return new msdyn_CheckForDeletedWebResourcesResponse(
      data as msdyn_CheckForDeletedWebResourcesResult
    );
  }
}
