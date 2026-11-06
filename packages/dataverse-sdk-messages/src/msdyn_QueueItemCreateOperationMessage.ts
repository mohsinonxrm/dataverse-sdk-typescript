import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_QueueItemCreateOperationResponse as msdyn_QueueItemCreateOperationResponseData } from "./types/index.js";

/**
 * msdyn_QueueItemCreateOperation request message
 *
 * Web API Action: msdyn_QueueItemCreateOperation
 */
export class msdyn_QueueItemCreateOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_QueueItemCreateOperationResponse>
{
  constructor(public liveWorkItemId: string) {
    super("msdyn_QueueItemCreateOperation");
  }

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
    return msdyn_QueueItemCreateOperationResponse.fromResponse(data);
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
