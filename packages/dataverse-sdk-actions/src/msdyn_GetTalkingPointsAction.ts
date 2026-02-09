import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetTalkingPoints action
 */
export interface msdyn_GetTalkingPointsResponse {
  response: string;
}

/**
 * msdyn_GetTalkingPoints action
 *
 * Unbound action
 */
export class msdyn_GetTalkingPointsAction implements Executable<msdyn_GetTalkingPointsResponse> {
  constructor(
    public readonly entityId: string,
    public readonly entityType: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetTalkingPoints`;

    const body: Record<string, unknown> = {
      entityId: this.entityId,
      entityType: this.entityType,
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

  async parseResponse(response: Response): Promise<msdyn_GetTalkingPointsResponse> {
    const data = await response.json();
    return data as msdyn_GetTalkingPointsResponse;
  }
}
