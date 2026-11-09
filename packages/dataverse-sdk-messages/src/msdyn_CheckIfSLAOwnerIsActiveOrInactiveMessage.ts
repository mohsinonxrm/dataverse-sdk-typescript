import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfSLAOwnerIsActiveOrInactive message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive request message
 *
 * Web API Action: msdyn_CheckIfSLAOwnerIsActiveOrInactive
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters>;

  constructor(parameters: msdyn_CheckIfSLAOwnerIsActiveOrInactiveRequestParameters = {}) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfSLAOwnerIsActiveOrInactive`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfSLAOwnerIsActiveOrInactive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfSLAOwnerIsActiveOrInactiveResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfSLAOwnerIsActiveOrInactive response message
 *
 * `result` is the value the msdyn_CheckIfSLAOwnerIsActiveOrInactive action returns (see {@link msdyn_CheckIfSLAOwnerIsActiveOrInactiveResult}).
 */
export class msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfSLAOwnerIsActiveOrInactiveResult) {
    super("msdyn_CheckIfSLAOwnerIsActiveOrInactive");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse {
    return new msdyn_CheckIfSLAOwnerIsActiveOrInactiveResponse(
      data as msdyn_CheckIfSLAOwnerIsActiveOrInactiveResult
    );
  }
}
