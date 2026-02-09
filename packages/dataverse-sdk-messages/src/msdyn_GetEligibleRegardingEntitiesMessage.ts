import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetEligibleRegardingEntities request message
 *
 * Web API Action: msdyn_GetEligibleRegardingEntities
 */
export class msdyn_GetEligibleRegardingEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEligibleRegardingEntitiesResponse>
{
  constructor(
    public workflowId: string,
    public correlationId: string
  ) {
    super("msdyn_GetEligibleRegardingEntities");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEligibleRegardingEntities`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    const data = await response.json();
    return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_GetEligibleRegardingEntities response message
 */
export class msdyn_GetEligibleRegardingEntitiesResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetEligibleRegardingEntities");
  }

  static fromResponse(data: unknown): msdyn_GetEligibleRegardingEntitiesResponse {
    return new msdyn_GetEligibleRegardingEntitiesResponse((data as any).value);
  }
}
