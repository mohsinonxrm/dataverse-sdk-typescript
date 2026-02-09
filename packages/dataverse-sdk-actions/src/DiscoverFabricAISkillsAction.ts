import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DiscoverFabricAISkills action
 */
export interface DiscoverFabricAISkillsResponse {
  fabricAISkills: string;
}

/**
 * DiscoverFabricAISkills action
 *
 * Unbound action
 */
export class DiscoverFabricAISkillsAction implements Executable<DiscoverFabricAISkillsResponse> {
  constructor(
    public readonly workspaceId: string,
    public readonly fabricEnvironment: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DiscoverFabricAISkillsResponse> {
    const data = await response.json();
    return data as DiscoverFabricAISkillsResponse;
  }
}
