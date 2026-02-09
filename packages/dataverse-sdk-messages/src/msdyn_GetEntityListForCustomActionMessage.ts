import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    const data = await response.json();
    return msdyn_GetEntityListForCustomActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      workflowId: this.workflowId,
      correlationId: this.correlationId,
    };
  }
}

/**
 * msdyn_GetEntityListForCustomAction response message
 */
export class msdyn_GetEntityListForCustomActionResponse extends OrganizationResponse {
  constructor(public result: EntityReference[]) {
    super("msdyn_GetEntityListForCustomAction");
  }

  static fromResponse(data: unknown): msdyn_GetEntityListForCustomActionResponse {
    return new msdyn_GetEntityListForCustomActionResponse((data as any).value);
  }
}
