import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_recurringsegmentaction action
 */
export interface msdyn_recurringsegmentactionResponse {
  result: string;
}

/**
 * msdyn_recurringsegmentaction action
 *
 * Unbound action
 */
export class msdyn_recurringsegmentactionAction implements Executable<msdyn_recurringsegmentactionResponse> {
  constructor(
    public readonly payload: string,
    public readonly operationType: string,
    public readonly segmentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_recurringsegmentaction`;

    const body: Record<string, unknown> = {
      payload: this.payload,
      operationType: this.operationType,
      segmentId: this.segmentId,
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

  async parseResponse(response: Response): Promise<msdyn_recurringsegmentactionResponse> {
    const data = await response.json();
    return data as msdyn_recurringsegmentactionResponse;
  }
}
