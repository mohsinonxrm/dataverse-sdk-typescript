import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveOptimizeWorkItemPayloadResponse as msdyn_RetrieveOptimizeWorkItemPayloadResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveOptimizeWorkItemPayload message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeWorkItemPayloadRequestParameters {
  WorkItemId: string;
  WorkflowRunId?: string;
}

/**
 * msdyn_RetrieveOptimizeWorkItemPayload request message
 *
 * Web API Action: msdyn_RetrieveOptimizeWorkItemPayload
 */
export class msdyn_RetrieveOptimizeWorkItemPayloadRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveOptimizeWorkItemPayloadResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveOptimizeWorkItemPayloadRequestParameters>;

  constructor(parameters: msdyn_RetrieveOptimizeWorkItemPayloadRequestParameters) {
    super("msdyn_RetrieveOptimizeWorkItemPayload", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeWorkItemPayload`;

    const body = requestBody({
      WorkItemId: this.Parameters.WorkItemId,
      WorkflowRunId: this.Parameters.WorkflowRunId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOptimizeWorkItemPayloadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_RetrieveOptimizeWorkItemPayloadResponse.fromResponse({});
    return msdyn_RetrieveOptimizeWorkItemPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveOptimizeWorkItemPayload response message
 */
export class msdyn_RetrieveOptimizeWorkItemPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeWorkItemPayloadResponseData) {
    super("msdyn_RetrieveOptimizeWorkItemPayload");
  }

  static fromResponse(data: unknown): msdyn_RetrieveOptimizeWorkItemPayloadResponse {
    return new msdyn_RetrieveOptimizeWorkItemPayloadResponse(
      responseObject<msdyn_RetrieveOptimizeWorkItemPayloadResponseData>(data)
    );
  }
}
