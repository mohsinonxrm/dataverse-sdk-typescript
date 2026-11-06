import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForPendingProcesses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForPendingProcessesRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForPendingProcesses request message
 *
 * Web API Action: msdyn_CheckForPendingProcesses
 */
export class msdyn_CheckForPendingProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForPendingProcessesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForPendingProcessesRequestParameters>;

  constructor(parameters: msdyn_CheckForPendingProcessesRequestParameters = {}) {
    super("msdyn_CheckForPendingProcesses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForPendingProcesses`;

    const body = requestBody({
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

  async parseResponse(response: Response): Promise<msdyn_CheckForPendingProcessesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForPendingProcessesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForPendingProcesses action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForPendingProcessesResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForPendingProcesses response message
 *
 * `result` is the value the msdyn_CheckForPendingProcesses action returns (see {@link msdyn_CheckForPendingProcessesResult}).
 */
export class msdyn_CheckForPendingProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForPendingProcessesResult) {
    super("msdyn_CheckForPendingProcesses");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForPendingProcessesResponse {
    return new msdyn_CheckForPendingProcessesResponse(data as msdyn_CheckForPendingProcessesResult);
  }
}
