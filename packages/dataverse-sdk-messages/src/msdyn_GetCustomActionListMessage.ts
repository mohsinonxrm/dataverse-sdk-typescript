import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetCustomActionList request message
 *
 * Web API Action: msdyn_GetCustomActionList
 */
export class msdyn_GetCustomActionListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionListResponse>
{
  constructor(
    public workflowId: string,
    public entityName: string,
    public correlationId: string
  ) {
    super("msdyn_GetCustomActionList");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionList`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      entityName: this.entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionListResponse> {
    const data = await response.json();
    return msdyn_GetCustomActionListResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      entityName: this.entityName,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_GetCustomActionList response message
 */
export class msdyn_GetCustomActionListResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetCustomActionList");
  }

  static fromResponse(data: unknown): msdyn_GetCustomActionListResponse {
    return new msdyn_GetCustomActionListResponse((data as any).value);
  }
}
