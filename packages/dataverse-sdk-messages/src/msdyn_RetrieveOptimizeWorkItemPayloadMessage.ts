import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveOptimizeWorkItemPayloadResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveOptimizeWorkItemPayload action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOptimizeWorkItemPayloadResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveOptimizeWorkItemPayload response message
 *
 * `result` is the value the msdyn_RetrieveOptimizeWorkItemPayload action returns (see {@link msdyn_RetrieveOptimizeWorkItemPayloadResult}).
 */
export class msdyn_RetrieveOptimizeWorkItemPayloadResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeWorkItemPayloadResult) {
    super("msdyn_RetrieveOptimizeWorkItemPayload");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveOptimizeWorkItemPayloadResponse {
    return new msdyn_RetrieveOptimizeWorkItemPayloadResponse(
      data as msdyn_RetrieveOptimizeWorkItemPayloadResult
    );
  }
}
