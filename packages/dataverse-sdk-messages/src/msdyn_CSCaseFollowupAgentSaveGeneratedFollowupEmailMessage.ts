import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse.fromResponse({});
    return msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail response message
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponseData) {
    super("msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail");
  }

  static fromResponse(data: unknown): msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
    return new msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse(
      responseObject<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponseData>(data)
    );
  }
}
