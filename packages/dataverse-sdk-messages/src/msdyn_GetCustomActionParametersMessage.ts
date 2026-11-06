import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetCustomActionParametersResponse as msdyn_GetCustomActionParametersResponseData } from "./types/index.js";

/**
 * msdyn_GetCustomActionParameters request message
 *
 * Web API Action: msdyn_GetCustomActionParameters
 */
export class msdyn_GetCustomActionParametersRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCustomActionParametersResponse>
{
  constructor(
    public workflowId: string,
    public customAction: string,
    public correlationId: string
  ) {
    super("msdyn_GetCustomActionParameters");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCustomActionParameters`;

    const body: Record<string, unknown> = {
      workflowId: this.workflowId,
      customAction: this.customAction,
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

  async parseResponse(response: Response): Promise<msdyn_GetCustomActionParametersResponse> {
    const data = await response.json();
    return msdyn_GetCustomActionParametersResponse.fromResponse(data);
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
