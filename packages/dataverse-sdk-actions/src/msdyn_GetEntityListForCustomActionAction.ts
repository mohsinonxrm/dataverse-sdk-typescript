import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_GetEntityListForCustomAction action
 */
export interface msdyn_GetEntityListForCustomActionResponse {
  value: EntityReference[];
}

/**
 * msdyn_GetEntityListForCustomAction action
 *
 * Unbound action
 */
export class msdyn_GetEntityListForCustomActionAction implements Executable<msdyn_GetEntityListForCustomActionResponse> {
  constructor(
    public readonly workflowId: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityListForCustomAction`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    const data = await response.json();
    return data as msdyn_GetEntityListForCustomActionResponse;
  }
}
