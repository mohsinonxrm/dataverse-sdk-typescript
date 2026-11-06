import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UnifiedRoutingQueueItemOperationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UnifiedRoutingQueueItemOperations action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UnifiedRoutingQueueItemOperationsResult {
  "@odata.context"?: string;
  UnifiedRoutingQueueItemOperationsResponsePropertiesJson: string;
}

/**
 * msdyn_UnifiedRoutingQueueItemOperations response message
 *
 * `result` is the value the msdyn_UnifiedRoutingQueueItemOperations action returns (see {@link msdyn_UnifiedRoutingQueueItemOperationsResult}).
 */
export class msdyn_UnifiedRoutingQueueItemOperationsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UnifiedRoutingQueueItemOperationsResult) {
    super("msdyn_UnifiedRoutingQueueItemOperations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UnifiedRoutingQueueItemOperationsResponse {
    return new msdyn_UnifiedRoutingQueueItemOperationsResponse(
      data as msdyn_UnifiedRoutingQueueItemOperationsResult
    );
  }
}
