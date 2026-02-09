import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_assignentitysync action
 */
export interface msdyn_assignentitysyncResponse {
  AssignmentPassed: boolean;
}

/**
 * msdyn_assignentitysync action
 *
 * Unbound action
 */
export class msdyn_assignentitysyncAction implements Executable<msdyn_assignentitysyncResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string,
    public readonly segmentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentitysync`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SegmentId: this.segmentId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentitysyncResponse> {
    const data = await response.json();
    return data as msdyn_assignentitysyncResponse;
  }
}
