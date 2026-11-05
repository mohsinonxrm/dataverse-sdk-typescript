import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse as msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponseData } from "./types/index.js";

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail request message
 *
 * Web API Action: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail`;

    const body: Record<string, unknown> = {
      msdyn_payload: this.msdyn_payload,
    };

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
    const data = await response.json();
    return msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse.fromResponse(data);
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
