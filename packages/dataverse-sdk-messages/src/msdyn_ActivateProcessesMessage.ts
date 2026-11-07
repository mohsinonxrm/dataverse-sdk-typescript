import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ActivateProcesses message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActivateProcessesRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ActivateProcesses request message
 *
 * Web API Action: msdyn_ActivateProcesses
 */
export class msdyn_ActivateProcessesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ActivateProcessesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ActivateProcessesRequestParameters>;

  constructor(parameters: msdyn_ActivateProcessesRequestParameters = {}) {
    super("msdyn_ActivateProcesses", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActivateProcesses`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_ActivateProcessesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ActivateProcessesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ActivateProcesses action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ActivateProcessesResult {
  "@odata.context"?: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * msdyn_ActivateProcesses response message
 *
 * `result` is the value the msdyn_ActivateProcesses action returns (see {@link msdyn_ActivateProcessesResult}).
 */
export class msdyn_ActivateProcessesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ActivateProcessesResult) {
    super("msdyn_ActivateProcesses");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ActivateProcessesResponse {
    return new msdyn_ActivateProcessesResponse(data as msdyn_ActivateProcessesResult);
  }
}
