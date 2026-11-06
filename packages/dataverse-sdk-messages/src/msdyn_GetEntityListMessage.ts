import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetEntityList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityListRequestParameters {
  correlationId: string;
  workflowId: string;
}

/**
 * msdyn_GetEntityList request message
 *
 * Web API Action: msdyn_GetEntityList
 */
export class msdyn_GetEntityListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityListResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityListRequestParameters>;

  constructor(parameters: msdyn_GetEntityListRequestParameters) {
    super("msdyn_GetEntityList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityList`;

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

  async parseResponse(response: Response): Promise<msdyn_GetEntityListResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetEntityListResponse.fromResponse(text ? JSON.parse(text) : {});
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
