import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForDeletedProcess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForDeletedProcessRequestParameters {
  EntityIds?: string;
  SolutionId?: string;
}

/**
 * msdyn_CheckForDeletedProcess request message
 *
 * Web API Action: msdyn_CheckForDeletedProcess
 */
export class msdyn_CheckForDeletedProcessRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForDeletedProcessResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForDeletedProcessRequestParameters>;

  constructor(parameters: msdyn_CheckForDeletedProcessRequestParameters = {}) {
    super("msdyn_CheckForDeletedProcess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForDeletedProcess`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckForDeletedProcessResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForDeletedProcessResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForDeletedProcess action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForDeletedProcessResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForDeletedProcess response message
 *
 * `result` is the value the msdyn_CheckForDeletedProcess action returns (see {@link msdyn_CheckForDeletedProcessResult}).
 */
export class msdyn_CheckForDeletedProcessResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForDeletedProcessResult) {
    super("msdyn_CheckForDeletedProcess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForDeletedProcessResponse {
    return new msdyn_CheckForDeletedProcessResponse(data as msdyn_CheckForDeletedProcessResult);
  }
}
