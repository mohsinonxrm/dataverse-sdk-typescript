import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetPostOperationsResponse> {
    const data = await response.json();
    return msdyn_GetPostOperationsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_GetPostOperations response message
 */
export class msdyn_GetPostOperationsResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetPostOperations");
  }

  static fromResponse(data: unknown): msdyn_GetPostOperationsResponse {
    return new msdyn_GetPostOperationsResponse((data as any).value);
  }
}
