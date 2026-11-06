import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_checkKnowledgeManagementAgent request message
 *
 * Web API Action: msdyn_checkKnowledgeManagementAgent
 */
export class msdyn_checkKnowledgeManagementAgentRequest
  extends OrganizationRequest
  implements Executable<msdyn_checkKnowledgeManagementAgentResponse>
{
  constructor() {
    super("msdyn_checkKnowledgeManagementAgent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_checkKnowledgeManagementAgent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_checkKnowledgeManagementAgentResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_checkKnowledgeManagementAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_checkKnowledgeManagementAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_checkKnowledgeManagementAgentResult {
  "@odata.context"?: string;
  msdyn_apiResponse: string;
}

/**
 * msdyn_checkKnowledgeManagementAgent response message
 *
 * `result` is the value the msdyn_checkKnowledgeManagementAgent action returns (see {@link msdyn_checkKnowledgeManagementAgentResult}).
 */
export class msdyn_checkKnowledgeManagementAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_checkKnowledgeManagementAgentResult) {
    super("msdyn_checkKnowledgeManagementAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_checkKnowledgeManagementAgentResponse {
    return new msdyn_checkKnowledgeManagementAgentResponse(
      data as msdyn_checkKnowledgeManagementAgentResult
    );
  }
}
