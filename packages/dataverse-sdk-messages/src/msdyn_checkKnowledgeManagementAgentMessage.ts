import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_checkKnowledgeManagementAgentResponse as msdyn_checkKnowledgeManagementAgentResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_checkKnowledgeManagementAgentResponse.fromResponse({});
    return msdyn_checkKnowledgeManagementAgentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_checkKnowledgeManagementAgent response message
 */
export class msdyn_checkKnowledgeManagementAgentResponse extends OrganizationResponse {
  constructor(public result: msdyn_checkKnowledgeManagementAgentResponseData) {
    super("msdyn_checkKnowledgeManagementAgent");
  }

  static fromResponse(data: unknown): msdyn_checkKnowledgeManagementAgentResponse {
    return new msdyn_checkKnowledgeManagementAgentResponse(
      responseObject<msdyn_checkKnowledgeManagementAgentResponseData>(data)
    );
  }
}
