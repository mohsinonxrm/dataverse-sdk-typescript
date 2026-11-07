import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CSCaseClosureProcessAgentResponse message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCaseClosureProcessAgentResponseRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse request message
 *
 * Web API Action: msdyn_CSCaseClosureProcessAgentResponse
 */
export class msdyn_CSCaseClosureProcessAgentResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCaseClosureProcessAgentResponseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSCaseClosureProcessAgentResponseRequestParameters>;

  constructor(parameters: msdyn_CSCaseClosureProcessAgentResponseRequestParameters) {
    super("msdyn_CSCaseClosureProcessAgentResponse", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseClosureProcessAgentResponse`;

    const body = requestBody({
      msdyn_payload: this.Parameters.msdyn_payload,
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
  ): Promise<msdyn_CSCaseClosureProcessAgentResponseResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CSCaseClosureProcessAgentResponseResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CSCaseClosureProcessAgentResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCaseClosureProcessAgentResponseResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_CSCaseClosureProcessAgentResponse response message
 *
 * `result` is the value the msdyn_CSCaseClosureProcessAgentResponse action returns (see {@link msdyn_CSCaseClosureProcessAgentResponseResult}).
 */
export class msdyn_CSCaseClosureProcessAgentResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseClosureProcessAgentResponseResult) {
    super("msdyn_CSCaseClosureProcessAgentResponse");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CSCaseClosureProcessAgentResponseResponse {
    return new msdyn_CSCaseClosureProcessAgentResponseResponse(
      data as msdyn_CSCaseClosureProcessAgentResponseResult
    );
  }
}
