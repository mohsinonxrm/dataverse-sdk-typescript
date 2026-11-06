import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetCustomActionList message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionListRequestParameters {
  workflowId: string;
  entityName: string;
  correlationId: string;
}

/**
 * msdyn_GetCustomActionList request message
 *
 * Web API Action: msdyn_GetCustomActionList
 */
export class msdyn_GetCustomActionListRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionListResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCustomActionListRequestParameters>;

  constructor(parameters: msdyn_GetCustomActionListRequestParameters) {
    super("msdyn_GetCustomActionList", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionList`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
      entityName: this.Parameters.entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionListResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetCustomActionListResponse.fromResponse({});
    return msdyn_GetCustomActionListResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetCustomActionList response message
 */
export class msdyn_GetCustomActionListResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetCustomActionList");
  }

  static fromResponse(data: unknown): msdyn_GetCustomActionListResponse {
    return new msdyn_GetCustomActionListResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
