import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequestParameters {
  msdyn_payload: string;
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail request message
 *
 * Web API Action: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequestParameters>;

  constructor(parameters: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequestParameters) {
    super("msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail`;

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
  ): Promise<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail response message
 *
 * `result` is the value the msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail action returns (see {@link msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResult}).
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResult) {
    super("msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
    return new msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse(
      data as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResult
    );
  }
}
