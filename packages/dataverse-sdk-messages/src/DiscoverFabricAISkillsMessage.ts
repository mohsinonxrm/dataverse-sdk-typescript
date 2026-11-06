import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { DiscoverFabricAISkillsResponse as DiscoverFabricAISkillsResponseData } from "./types/index.js";

/**
 * Parameters of the DiscoverFabricAISkills message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricAISkillsRequestParameters {
  workspaceId: string;
  fabricEnvironment?: string;
}

/**
 * DiscoverFabricAISkills request message
 *
 * Web API Action: DiscoverFabricAISkills
 */
export class DiscoverFabricAISkillsRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricAISkillsResponse>
{
  declare readonly Parameters: Readonly<DiscoverFabricAISkillsRequestParameters>;

  constructor(parameters: DiscoverFabricAISkillsRequestParameters) {
    super("DiscoverFabricAISkills", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricAISkills`;

    const body = requestBody({
      workspaceId: this.Parameters.workspaceId,
      fabricEnvironment: this.Parameters.fabricEnvironment,
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

  async parseResponse(response: Response): Promise<DiscoverFabricAISkillsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return DiscoverFabricAISkillsResponse.fromResponse({});
    return DiscoverFabricAISkillsResponse.fromResponse(await response.json());
  }
}

/**
 * DiscoverFabricAISkills response message
 */
export class DiscoverFabricAISkillsResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricAISkillsResponseData) {
    super("DiscoverFabricAISkills");
  }

  static fromResponse(data: unknown): DiscoverFabricAISkillsResponse {
    return new DiscoverFabricAISkillsResponse(
      responseObject<DiscoverFabricAISkillsResponseData>(data)
    );
  }
}
