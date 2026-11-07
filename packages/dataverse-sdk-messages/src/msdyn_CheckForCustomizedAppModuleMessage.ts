import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForCustomizedAppModule message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForCustomizedAppModuleRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
  ExcludeSolutionIds?: string;
}

/**
 * msdyn_CheckForCustomizedAppModule request message
 *
 * Web API Action: msdyn_CheckForCustomizedAppModule
 */
export class msdyn_CheckForCustomizedAppModuleRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForCustomizedAppModuleResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForCustomizedAppModuleRequestParameters>;

  constructor(parameters: msdyn_CheckForCustomizedAppModuleRequestParameters = {}) {
    super("msdyn_CheckForCustomizedAppModule", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForCustomizedAppModule`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForCustomizedAppModuleResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForCustomizedAppModuleResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForCustomizedAppModule action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForCustomizedAppModuleResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForCustomizedAppModule response message
 *
 * `result` is the value the msdyn_CheckForCustomizedAppModule action returns (see {@link msdyn_CheckForCustomizedAppModuleResult}).
 */
export class msdyn_CheckForCustomizedAppModuleResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForCustomizedAppModuleResult) {
    super("msdyn_CheckForCustomizedAppModule");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForCustomizedAppModuleResponse {
    return new msdyn_CheckForCustomizedAppModuleResponse(
      data as msdyn_CheckForCustomizedAppModuleResult
    );
  }
}
