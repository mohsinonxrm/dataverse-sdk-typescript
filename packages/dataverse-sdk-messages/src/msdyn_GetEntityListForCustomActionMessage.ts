import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEntityListForCustomAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListForCustomActionRequestParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetEntityListForCustomAction request message
 *
 * Web API Action: msdyn_GetEntityListForCustomAction
 */
export class msdyn_GetEntityListForCustomActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListForCustomActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityListForCustomActionRequestParameters>;

  constructor(parameters: msdyn_GetEntityListForCustomActionRequestParameters) {
    super("msdyn_GetEntityListForCustomAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityListForCustomAction`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
      correlationId: this.Parameters.correlationId,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListForCustomActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetEntityListForCustomActionResponse.fromResponse(text ? JSON.parse(text) : {});
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
