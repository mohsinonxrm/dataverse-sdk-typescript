import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AITestRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AITestRunRequestParameters {
  request: string;
}

/**
 * msdyn_AITestRun request message
 *
 * Web API Action: msdyn_AITestRun
 *
 * The first argument is the id of the msdyn_aitestcase record to call it on.
 */
export class msdyn_AITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_AITestRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_AITestRunRequestParameters>;

  constructor(
    public msdyn_aitestcaseId: string,
    parameters: msdyn_AITestRunRequestParameters
  ) {
    super("msdyn_AITestRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aitestcases(${this.msdyn_aitestcaseId})/Microsoft.Dynamics.CRM.msdyn_AITestRun`;

    const body = requestBody({
      request: this.Parameters.request,
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

  async parseResponse(response: Response): Promise<msdyn_AITestRunResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_AITestRunResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_AITestRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_AITestRunResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_AITestRun response message
 *
 * `result` is the value the msdyn_AITestRun action returns (see {@link msdyn_AITestRunResult}).
 */
export class msdyn_AITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_AITestRunResult) {
    super("msdyn_AITestRun");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_AITestRunResponse {
    return new msdyn_AITestRunResponse(data as msdyn_AITestRunResult);
  }
}
