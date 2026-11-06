import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_QueueItemCreateOperationResponse as msdyn_QueueItemCreateOperationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_QueueItemCreateOperationResponse.fromResponse({});
    return msdyn_QueueItemCreateOperationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_QueueItemCreateOperation response message
 */
export class msdyn_QueueItemCreateOperationResponse extends OrganizationResponse {
  constructor(public result: msdyn_QueueItemCreateOperationResponseData) {
    super("msdyn_QueueItemCreateOperation");
  }

  static fromResponse(data: unknown): msdyn_QueueItemCreateOperationResponse {
    return new msdyn_QueueItemCreateOperationResponse(
      responseObject<msdyn_QueueItemCreateOperationResponseData>(data)
    );
  }
}
