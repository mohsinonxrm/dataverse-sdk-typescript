import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForCustomizedOptionSetResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForCustomizedOptionSet action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForCustomizedOptionSetResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForCustomizedOptionSet response message
 *
 * `result` is the value the msdyn_CheckForCustomizedOptionSet action returns (see {@link msdyn_CheckForCustomizedOptionSetResult}).
 */
export class msdyn_CheckForCustomizedOptionSetResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedOptionSetResult) {
    super("msdyn_CheckForCustomizedOptionSet");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForCustomizedOptionSetResponse {
    return new msdyn_CheckForCustomizedOptionSetResponse(
      data as msdyn_CheckForCustomizedOptionSetResult
    );
  }
}
