import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetActionTypes request message
 *
 * Web API Action: msdyn_GetActionTypes
 */
export class msdyn_GetActionTypesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetActionTypesResponse>
{
  constructor(
    public workflowId: string,
    public correlationId: string
  ) {
    super("msdyn_GetActionTypes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetActionTypes`;

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

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    const data = await response.json();
    return msdyn_GetActionTypesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_GetActionTypes response message
 */
export class msdyn_GetActionTypesResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetActionTypes");
  }

  static fromResponse(data: unknown): msdyn_GetActionTypesResponse {
    return new msdyn_GetActionTypesResponse((data as any).value);
  }
}
