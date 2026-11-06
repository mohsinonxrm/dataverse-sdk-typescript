import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEligibleRegardingEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEligibleRegardingEntitiesRequestParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEligibleRegardingEntities request message
 *
 * Web API Action: msdyn_GetEligibleRegardingEntities
 */
export class msdyn_GetEligibleRegardingEntitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEligibleRegardingEntitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEligibleRegardingEntitiesRequestParameters>;

  constructor(parameters: msdyn_GetEligibleRegardingEntitiesRequestParameters) {
    super("msdyn_GetEligibleRegardingEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEligibleRegardingEntities`;

    const body = requestBody({
      correlationId: this.Parameters.correlationId,
      workflowId: this.Parameters.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEligibleRegardingEntitiesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse({});
    return msdyn_GetEligibleRegardingEntitiesResponse.fromResponse(await response.json());
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
