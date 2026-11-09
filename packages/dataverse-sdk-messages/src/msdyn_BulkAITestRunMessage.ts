import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_BulkAITestRun message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BulkAITestRunRequestParameters {
  request: string;
}

/**
 * msdyn_BulkAITestRun request message
 *
 * Web API Action: msdyn_BulkAITestRun
 */
export class msdyn_BulkAITestRunRequest
  extends OrganizationRequest
  implements Executable<msdyn_BulkAITestRunResponse>
{
  declare readonly Parameters: Readonly<msdyn_BulkAITestRunRequestParameters>;

  constructor(parameters: msdyn_BulkAITestRunRequestParameters) {
    super("msdyn_BulkAITestRun", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BulkAITestRun`;

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

  async parseResponse(response: Response): Promise<msdyn_BulkAITestRunResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_BulkAITestRunResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_BulkAITestRun action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_BulkAITestRunResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_BulkAITestRun response message
 *
 * `result` is the value the msdyn_BulkAITestRun action returns (see {@link msdyn_BulkAITestRunResult}).
 */
export class msdyn_BulkAITestRunResponse extends OrganizationResponse {
  constructor(public result: msdyn_BulkAITestRunResult) {
    super("msdyn_BulkAITestRun");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_BulkAITestRunResponse {
    return new msdyn_BulkAITestRunResponse(data as msdyn_BulkAITestRunResult);
  }
}
