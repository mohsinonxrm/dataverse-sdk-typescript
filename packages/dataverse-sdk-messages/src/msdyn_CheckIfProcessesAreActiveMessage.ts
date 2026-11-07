import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfProcessesAreActive message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfProcessesAreActiveRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckIfProcessesAreActive request message
 *
 * Web API Action: msdyn_CheckIfProcessesAreActive
 */
export class msdyn_CheckIfProcessesAreActiveRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfProcessesAreActiveResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfProcessesAreActiveRequestParameters>;

  constructor(parameters: msdyn_CheckIfProcessesAreActiveRequestParameters = {}) {
    super("msdyn_CheckIfProcessesAreActive", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfProcessesAreActive`;

    const body = requestBody({
      EntityIds: this.Parameters.EntityIds,
      SolutionId: this.Parameters.SolutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfProcessesAreActiveResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfProcessesAreActiveResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfProcessesAreActive action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfProcessesAreActiveResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfProcessesAreActive response message
 *
 * `result` is the value the msdyn_CheckIfProcessesAreActive action returns (see {@link msdyn_CheckIfProcessesAreActiveResult}).
 */
export class msdyn_CheckIfProcessesAreActiveResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfProcessesAreActiveResult) {
    super("msdyn_CheckIfProcessesAreActive");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfProcessesAreActiveResponse {
    return new msdyn_CheckIfProcessesAreActiveResponse(
      data as msdyn_CheckIfProcessesAreActiveResult
    );
  }
}
