import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail response message
 */
export class msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse) {
    super("msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmail");
  }

  static fromResponse(data: unknown): msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse {
    return new msdyn_CSCaseFollowupAgentSaveGeneratedFollowupEmailResponse((data as any).value);
  }
}
