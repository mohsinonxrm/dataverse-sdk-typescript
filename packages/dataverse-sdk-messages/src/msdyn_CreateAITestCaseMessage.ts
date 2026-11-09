import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateAITestCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateAITestCaseRequestParameters {
  request: string;
}

/**
 * msdyn_CreateAITestCase request message
 *
 * Web API Action: msdyn_CreateAITestCase
 */
export class msdyn_CreateAITestCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateAITestCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateAITestCaseRequestParameters>;

  constructor(parameters: msdyn_CreateAITestCaseRequestParameters) {
    super("msdyn_CreateAITestCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateAITestCase`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateAITestCaseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CreateAITestCaseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateAITestCase action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CreateAITestCaseResult {
  "@odata.context"?: string;
  response: string;
}

/**
 * msdyn_CreateAITestCase response message
 *
 * `result` is the value the msdyn_CreateAITestCase action returns (see {@link msdyn_CreateAITestCaseResult}).
 */
export class msdyn_CreateAITestCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateAITestCaseResult) {
    super("msdyn_CreateAITestCase");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateAITestCaseResponse {
    return new msdyn_CreateAITestCaseResponse(data as msdyn_CreateAITestCaseResult);
  }
}
