import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_QueueItemCreateOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_QueueItemCreateOperationRequestParameters {
  LiveWorkItemId: string;
}

/**
 * msdyn_QueueItemCreateOperation request message
 *
 * Web API Action: msdyn_QueueItemCreateOperation
 */
export class msdyn_QueueItemCreateOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueueItemCreateOperationResponse>
{
  declare readonly Parameters: Readonly<msdyn_QueueItemCreateOperationRequestParameters>;

  constructor(parameters: msdyn_QueueItemCreateOperationRequestParameters) {
    super("msdyn_QueueItemCreateOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_QueueItemCreateOperation`;

    const body = requestBody({
      LiveWorkItemId: this.Parameters.LiveWorkItemId,
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

  async parseResponse(response: Response): Promise<msdyn_QueueItemCreateOperationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_QueueItemCreateOperationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_QueueItemCreateOperation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_QueueItemCreateOperationResult {
  "@odata.context"?: string;
  msdyn_queueItemCreateAPIResponse: string;
}

/**
 * msdyn_QueueItemCreateOperation response message
 *
 * `result` is the value the msdyn_QueueItemCreateOperation action returns (see {@link msdyn_QueueItemCreateOperationResult}).
 */
export class msdyn_QueueItemCreateOperationResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueueItemCreateOperationResult) {
    super("msdyn_QueueItemCreateOperation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_QueueItemCreateOperationResponse {
    return new msdyn_QueueItemCreateOperationResponse(data as msdyn_QueueItemCreateOperationResult);
  }
}
