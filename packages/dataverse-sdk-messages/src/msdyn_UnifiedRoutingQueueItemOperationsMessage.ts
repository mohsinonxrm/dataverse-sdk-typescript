import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UnifiedRoutingQueueItemOperationsResponse as msdyn_UnifiedRoutingQueueItemOperationsResponseData } from "./types/index.js";

/**
 * msdyn_UnifiedRoutingQueueItemOperations request message
 *
 * Web API Action: msdyn_UnifiedRoutingQueueItemOperations
 */
export class msdyn_UnifiedRoutingQueueItemOperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UnifiedRoutingQueueItemOperationsResponse>
{
  constructor(public unifiedRoutingQueueItemOperationsRequestParametersJson: string) {
    super("msdyn_UnifiedRoutingQueueItemOperations");
  }

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
    return msdyn_UnifiedRoutingQueueItemOperationsResponse.fromResponse(data);
  }
}

/**
 * msdyn_UnifiedRoutingQueueItemOperations response message
 */
export class msdyn_UnifiedRoutingQueueItemOperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UnifiedRoutingQueueItemOperationsResponseData) {
    super("msdyn_UnifiedRoutingQueueItemOperations");
  }

  static fromResponse(data: unknown): msdyn_UnifiedRoutingQueueItemOperationsResponse {
    return new msdyn_UnifiedRoutingQueueItemOperationsResponse(
      responseObject<msdyn_UnifiedRoutingQueueItemOperationsResponseData>(data)
    );
  }
}
