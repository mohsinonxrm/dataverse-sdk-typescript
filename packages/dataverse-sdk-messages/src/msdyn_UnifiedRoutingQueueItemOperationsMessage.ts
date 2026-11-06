import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UnifiedRoutingQueueItemOperationsResponse as msdyn_UnifiedRoutingQueueItemOperationsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UnifiedRoutingQueueItemOperations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsRequestParameters {
  UnifiedRoutingQueueItemOperationsRequestParametersJson: string;
}

/**
 * msdyn_UnifiedRoutingQueueItemOperations request message
 *
 * Web API Action: msdyn_UnifiedRoutingQueueItemOperations
 */
export class msdyn_UnifiedRoutingQueueItemOperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UnifiedRoutingQueueItemOperationsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UnifiedRoutingQueueItemOperationsRequestParameters>;

  constructor(parameters: msdyn_UnifiedRoutingQueueItemOperationsRequestParameters) {
    super("msdyn_UnifiedRoutingQueueItemOperations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UnifiedRoutingQueueItemOperations`;

    const body = requestBody({
      UnifiedRoutingQueueItemOperationsRequestParametersJson:
        this.Parameters.UnifiedRoutingQueueItemOperationsRequestParametersJson,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UnifiedRoutingQueueItemOperationsResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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
