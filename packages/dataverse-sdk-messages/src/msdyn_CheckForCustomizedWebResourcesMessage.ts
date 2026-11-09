import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForCustomizedWebResources message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedWebResourcesRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedWebResources request message
 *
 * Web API Action: msdyn_CheckForCustomizedWebResources
 */
export class msdyn_CheckForCustomizedWebResourcesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedWebResourcesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedWebResourcesRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedWebResourcesRequestParameters = {}) {
    super("msdyn_CheckForCustomizedWebResources", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedWebResources`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedWebResourcesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForCustomizedWebResourcesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForCustomizedWebResources action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForCustomizedWebResourcesResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForCustomizedWebResources response message
 *
 * `result` is the value the msdyn_CheckForCustomizedWebResources action returns (see {@link msdyn_CheckForCustomizedWebResourcesResult}).
 */
export class msdyn_CheckForCustomizedWebResourcesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedWebResourcesResult) {
    super("msdyn_CheckForCustomizedWebResources");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForCustomizedWebResourcesResponse {
    return new msdyn_CheckForCustomizedWebResourcesResponse(
      data as msdyn_CheckForCustomizedWebResourcesResult
    );
  }
}
