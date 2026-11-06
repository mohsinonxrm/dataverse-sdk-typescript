import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_GetEntityList request message
 *
 * Web API Action: msdyn_GetEntityList
 */
export class msdyn_GetEntityListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListResponse>
{
  constructor(
    public correlationId: string,
    public workflowId: string
  ) {
    super("msdyn_GetEntityList");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityList`;

    const body: Record<string, unknown> = {
      correlationId: this.correlationId,
      workflowId: this.workflowId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListResponse> {
    const data = await response.json();
    return msdyn_GetEntityListResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetEntityList response message
 */
export class msdyn_GetEntityListResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetEntityList");
  }

  static fromResponse(data: unknown): msdyn_GetEntityListResponse {
    return new msdyn_GetEntityListResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
