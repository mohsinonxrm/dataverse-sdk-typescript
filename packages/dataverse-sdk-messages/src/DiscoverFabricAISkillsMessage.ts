import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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

  toRequestBody(): Record<string, unknown> {
    return {
      workspaceId: this.workspaceId,
      fabricEnvironment: this.fabricEnvironment,
    };
  }
}

/**
 * DiscoverFabricAISkills response message
 */
export class DiscoverFabricAISkillsResponse extends OrganizationResponse {
  constructor(public result: DiscoverFabricAISkillsResponse) {
    super("DiscoverFabricAISkills");
  }

  static fromResponse(data: unknown): DiscoverFabricAISkillsResponse {
    return new DiscoverFabricAISkillsResponse((data as any).value);
  }
}
