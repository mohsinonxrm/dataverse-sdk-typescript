import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_GetPostOperations request message
 *
 * Web API Action: msdyn_GetPostOperations
 */
export class msdyn_GetPostOperationsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetPostOperationsResponse>
{
  constructor(
    public workflowId: string,
    public correlationId: string
  ) {
    super("msdyn_GetPostOperations");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetPostOperations`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetPostOperationsResponse> {
    const data = await response.json();
    return msdyn_GetPostOperationsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetPostOperations response message
 */
export class msdyn_GetPostOperationsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetPostOperations");
  }

  static fromResponse(data: unknown): msdyn_GetPostOperationsResponse {
    return new msdyn_GetPostOperationsResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
