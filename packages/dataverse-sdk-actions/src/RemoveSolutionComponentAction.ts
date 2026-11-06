import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { solutioncomponent } from "./types/index.js";

/**
 * Response from RemoveSolutionComponent action
 */
export interface RemoveSolutionComponentResponse {
  id: string;
}

/**
 * RemoveSolutionComponent action
 *
 * Unbound action
 */
export class RemoveSolutionComponentAction implements Executable<RemoveSolutionComponentResponse> {
  constructor(
    public readonly solutionComponent: EntityReference | EntityPayload<solutioncomponent>,
    public readonly componentType: number,
    public readonly solutionUniqueName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveSolutionComponent`;

    const body: Record<string, unknown> = {
      SolutionComponent: this.solutionComponent,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<RemoveSolutionComponentResponse> {
    const data = await response.json();
    return data as RemoveSolutionComponentResponse;
  }
}
