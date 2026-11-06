import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    const data = await response.json();
    return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetEligibleRegardingEntities response message
 */
export class msdyn_GetEligibleRegardingEntitiesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetEligibleRegardingEntities");
  }

  static fromResponse(data: unknown): msdyn_GetEligibleRegardingEntitiesResponse {
    return new msdyn_GetEligibleRegardingEntitiesResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
