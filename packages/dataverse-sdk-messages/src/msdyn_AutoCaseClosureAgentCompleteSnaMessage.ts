import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_AutoCaseClosureAgentCompleteSna request message
 *
 * Web API Action: msdyn_AutoCaseClosureAgentCompleteSna
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaRequest
  extends OrganizationRequest
  implements Executable<msdyn_AutoCaseClosureAgentCompleteSnaResponse>
{
  constructor(public msdyn_payload: string) {
    super("msdyn_AutoCaseClosureAgentCompleteSna");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AutoCaseClosureAgentCompleteSna`;

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

  async parseResponse(response: Response): Promise<msdyn_AutoCaseClosureAgentCompleteSnaResponse> {
    // No return value (204 No Content)
    return new msdyn_AutoCaseClosureAgentCompleteSnaResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_payload: this.msdyn_payload,
    };
  }
}

/**
 * msdyn_AutoCaseClosureAgentCompleteSna response message
 */
export class msdyn_AutoCaseClosureAgentCompleteSnaResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_AutoCaseClosureAgentCompleteSna");
  }

  static fromResponse(_data: unknown): msdyn_AutoCaseClosureAgentCompleteSnaResponse {
    return new msdyn_AutoCaseClosureAgentCompleteSnaResponse();
  }
}
