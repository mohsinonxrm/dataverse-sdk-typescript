import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetActionTypes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetActionTypesRequestParameters {
  workflowId: string;
  correlationId: string;
}

/**
 * msdyn_GetActionTypes request message
 *
 * Web API Action: msdyn_GetActionTypes
 */
export class msdyn_GetActionTypesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetActionTypesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetActionTypesRequestParameters>;

  constructor(parameters: msdyn_GetActionTypesRequestParameters) {
    super("msdyn_GetActionTypes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetActionTypes`;

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

  async parseResponse(response: Response): Promise<msdyn_GetActionTypesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetActionTypesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetActionTypes response message
 */
export class msdyn_GetActionTypesResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_GetActionTypes");
  }

  static fromResponse(data: unknown): msdyn_GetActionTypesResponse {
    return new msdyn_GetActionTypesResponse(responseValue<Record<string, unknown>[]>(data));
  }
}
