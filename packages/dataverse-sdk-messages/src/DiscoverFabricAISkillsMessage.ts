import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { DiscoverFabricAISkillsResponse as DiscoverFabricAISkillsResponseData } from "./types/index.js";

/**
 * DiscoverFabricAISkills request message
 *
 * Web API Action: DiscoverFabricAISkills
 */
export class DiscoverFabricAISkillsRequest
  extends OrganizationRequest
  implements Executable<DiscoverFabricAISkillsResponse>
{
  constructor(
    public workspaceId: string,
    public fabricEnvironment: string
  ) {
    super("DiscoverFabricAISkills");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricAISkills`;

    const body: Record<string, unknown> = {
      workspaceId: this.workspaceId,
      fabricEnvironment: this.fabricEnvironment,
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

  async parseResponse(response: Response): Promise<DiscoverFabricAISkillsResponse> {
    const data = await response.json();
    return DiscoverFabricAISkillsResponse.fromResponse(data);
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
