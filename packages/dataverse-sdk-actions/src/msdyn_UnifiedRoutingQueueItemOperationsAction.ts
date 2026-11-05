import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UnifiedRoutingQueueItemOperations action
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsResponse {
  UnifiedRoutingQueueItemOperationsResponsePropertiesJson: string;
}

/**
 * msdyn_UnifiedRoutingQueueItemOperations action
 *
 * Unbound action
 */
export class msdyn_UnifiedRoutingQueueItemOperationsAction implements Executable<msdyn_UnifiedRoutingQueueItemOperationsResponse> {
  constructor(public readonly unifiedRoutingQueueItemOperationsRequestParametersJson: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingQueueItemOperations`;

    const body: Record<string, unknown> = {
      UnifiedRoutingQueueItemOperationsRequestParametersJson:
        this.unifiedRoutingQueueItemOperationsRequestParametersJson,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UnifiedRoutingQueueItemOperationsResponse> {
    const data = await response.json();
    return data as msdyn_UnifiedRoutingQueueItemOperationsResponse;
  }
}
