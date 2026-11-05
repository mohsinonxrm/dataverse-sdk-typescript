import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";

/**
 * msdyn_GetEntityListForCustomAction request message
 *
 * Web API Action: msdyn_GetEntityListForCustomAction
 */
export class msdyn_GetEntityListForCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListForCustomActionResponse>
{
  constructor(
    public workflowId: string,
    public correlationId: string
  ) {
    super("msdyn_GetEntityListForCustomAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityListForCustomAction`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    const data = await response.json();
    return msdyn_GetEntityListForCustomActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetEntityListForCustomAction response message
 */
export class msdyn_GetEntityListForCustomActionResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetEntityListForCustomAction");
  }

  static fromResponse(data: unknown): msdyn_GetEntityListForCustomActionResponse {
    return new msdyn_GetEntityListForCustomActionResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
