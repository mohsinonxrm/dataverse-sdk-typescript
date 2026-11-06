import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DiscoverFabricAISkills action
 */
export interface DiscoverFabricAISkillsResponse {
  fabricAISkills: string;
}

/**
 * Parameters of the DiscoverFabricAISkills action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DiscoverFabricAISkillsActionParameters {
  workspaceId: string;
  fabricEnvironment?: string;
}

/**
 * DiscoverFabricAISkills action
 *
 * Unbound action
 */
export class DiscoverFabricAISkillsAction implements Executable<DiscoverFabricAISkillsResponse> {
  constructor(public readonly parameters: DiscoverFabricAISkillsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DiscoverFabricAISkills`;

    const body = requestBody({
      workspaceId: this.parameters.workspaceId,
      fabricEnvironment: this.parameters.fabricEnvironment,
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
    if (response.status === 204) return {} as DiscoverFabricAISkillsResponse;
    return (await response.json()) as DiscoverFabricAISkillsResponse;
  }
}
