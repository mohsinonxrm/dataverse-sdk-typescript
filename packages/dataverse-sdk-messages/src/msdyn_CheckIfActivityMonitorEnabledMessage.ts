import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckIfActivityMonitorEnabled message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckIfActivityMonitorEnabledRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckIfActivityMonitorEnabled request message
 *
 * Web API Action: msdyn_CheckIfActivityMonitorEnabled
 */
export class msdyn_CheckIfActivityMonitorEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfActivityMonitorEnabledResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckIfActivityMonitorEnabledRequestParameters>;

  constructor(parameters: msdyn_CheckIfActivityMonitorEnabledRequestParameters = {}) {
    super("msdyn_CheckIfActivityMonitorEnabled", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorEnabled`;

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

  async parseResponse(response: Response): Promise<msdyn_CheckIfActivityMonitorEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfActivityMonitorEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfActivityMonitorEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfActivityMonitorEnabledResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfActivityMonitorEnabled response message
 *
 * `result` is the value the msdyn_CheckIfActivityMonitorEnabled action returns (see {@link msdyn_CheckIfActivityMonitorEnabledResult}).
 */
export class msdyn_CheckIfActivityMonitorEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfActivityMonitorEnabledResult) {
    super("msdyn_CheckIfActivityMonitorEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfActivityMonitorEnabledResponse {
    return new msdyn_CheckIfActivityMonitorEnabledResponse(
      data as msdyn_CheckIfActivityMonitorEnabledResult
    );
  }
}
