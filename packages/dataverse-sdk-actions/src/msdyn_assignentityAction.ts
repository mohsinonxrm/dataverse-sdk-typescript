import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_assignentity action
 */
export interface msdyn_assignentityResponse {
  // No content returned
}

/**
 * msdyn_assignentity action
 *
 * Unbound action
 */
export class msdyn_assignentityAction implements Executable<msdyn_assignentityResponse> {
  constructor(
    public readonly regardingEntityId: string,
    public readonly regardingEntityName: string,
    public readonly segmentId: string,
    public readonly correlationId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_assignentity`;

    const body: Record<string, unknown> = {
      RegardingEntityId: this.regardingEntityId,
      RegardingEntityName: this.regardingEntityName,
      SegmentId: this.segmentId,
      CorrelationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_assignentityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
