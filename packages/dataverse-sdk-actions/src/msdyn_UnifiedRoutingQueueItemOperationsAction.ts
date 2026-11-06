import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UnifiedRoutingQueueItemOperations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_UnifiedRoutingQueueItemOperationsResponse;
  }
}
