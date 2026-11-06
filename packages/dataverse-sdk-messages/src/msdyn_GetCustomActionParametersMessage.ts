import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetCustomActionParametersResponse as msdyn_GetCustomActionParametersResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetCustomActionParameters message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCustomActionParametersRequestParameters {
  workflowId: string;
  customAction: string;
  correlationId: string;
}

/**
 * msdyn_GetCustomActionParameters request message
 *
 * Web API Action: msdyn_GetCustomActionParameters
 */
export class msdyn_GetCustomActionParametersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionParametersResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetCustomActionParametersRequestParameters>;

  constructor(parameters: msdyn_GetCustomActionParametersRequestParameters) {
    super("msdyn_GetCustomActionParameters", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body = requestBody({
      workflowId: this.Parameters.workflowId,
      customAction: this.Parameters.customAction,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetCustomActionParametersResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetCustomActionParameters response message
 */
export class msdyn_GetCustomActionParametersResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCustomActionParametersResponseData) {
    super("msdyn_GetCustomActionParameters");
  }

  static fromResponse(data: unknown): msdyn_GetCustomActionParametersResponse {
    return new msdyn_GetCustomActionParametersResponse(
      responseObject<msdyn_GetCustomActionParametersResponseData>(data)
    );
  }
}
