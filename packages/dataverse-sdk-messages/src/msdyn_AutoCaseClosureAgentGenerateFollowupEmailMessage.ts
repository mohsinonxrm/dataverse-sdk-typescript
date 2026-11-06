import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_AutoCaseClosureAgentGenerateFollowupEmail message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequestParameters {
  Payload: string;
}

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail request message
 *
 * Web API Action: msdyn_AutoCaseClosureAgentGenerateFollowupEmail
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse>
{
  declare readonly Parameters: Readonly<msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequestParameters>;

  constructor(parameters: msdyn_AutoCaseClosureAgentGenerateFollowupEmailRequestParameters) {
    super("msdyn_AutoCaseClosureAgentGenerateFollowupEmail", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentGenerateFollowupEmail`;

    const body = requestBody({
      Payload: this.Parameters.Payload,
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
  ): Promise<msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse> {
    // No return value (204 No Content)
    return new msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse();
  }
}

/**
 * msdyn_AutoCaseClosureAgentGenerateFollowupEmail response message
 */
export class msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutoCaseClosureAgentGenerateFollowupEmail");
  }

  static fromResponse(_data: unknown): msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse {
    return new msdyn_AutoCaseClosureAgentGenerateFollowupEmailResponse();
  }
}
