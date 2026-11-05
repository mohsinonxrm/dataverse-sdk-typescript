import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_QueueItemCreateOperation action
 */
export interface msdyn_QueueItemCreateOperationResponse {
  msdyn_queueItemCreateAPIResponse: string;
}

/**
 * msdyn_QueueItemCreateOperation action
 *
 * Unbound action
 */
export class msdyn_QueueItemCreateOperationAction implements Executable<msdyn_QueueItemCreateOperationResponse> {
  constructor(public readonly liveWorkItemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemCreateOperation`;

    const body: Record<string, unknown> = {
      LiveWorkItemId: this.liveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_QueueItemCreateOperationResponse> {
    const data = await response.json();
    return data as msdyn_QueueItemCreateOperationResponse;
  }
}
