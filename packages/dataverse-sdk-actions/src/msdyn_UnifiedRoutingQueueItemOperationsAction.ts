import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UnifiedRoutingQueueItemOperations action
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsResponse {
  UnifiedRoutingQueueItemOperationsResponsePropertiesJson: string;
}

/**
 * Parameters of the msdyn_UnifiedRoutingQueueItemOperations action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsActionParameters {
  UnifiedRoutingQueueItemOperationsRequestParametersJson: string;
}

/**
 * msdyn_UnifiedRoutingQueueItemOperations action
 *
 * Unbound action
 */
export class msdyn_UnifiedRoutingQueueItemOperationsAction implements Executable<msdyn_UnifiedRoutingQueueItemOperationsResponse> {
  constructor(
    public readonly parameters: msdyn_UnifiedRoutingQueueItemOperationsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingQueueItemOperations`;

    const body = requestBody({
      UnifiedRoutingQueueItemOperationsRequestParametersJson:
        this.parameters.UnifiedRoutingQueueItemOperationsRequestParametersJson,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_UnifiedRoutingQueueItemOperationsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UnifiedRoutingQueueItemOperationsResponse;
    return (await response.json()) as msdyn_UnifiedRoutingQueueItemOperationsResponse;
  }
}
