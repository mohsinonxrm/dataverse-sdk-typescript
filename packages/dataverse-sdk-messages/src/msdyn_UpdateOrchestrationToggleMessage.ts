import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdateOrchestrationToggleResponse as msdyn_UpdateOrchestrationToggleResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdateOrchestrationToggle message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateOrchestrationToggleRequestParameters {
  IsEnabled: boolean;
}

/**
 * msdyn_UpdateOrchestrationToggle request message
 *
 * Web API Action: msdyn_UpdateOrchestrationToggle
 */
export class msdyn_UpdateOrchestrationToggleRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateOrchestrationToggleResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateOrchestrationToggleRequestParameters>;

  constructor(parameters: msdyn_UpdateOrchestrationToggleRequestParameters) {
    super("msdyn_UpdateOrchestrationToggle", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateOrchestrationToggle`;

    const body = requestBody({
      IsEnabled: this.Parameters.IsEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateOrchestrationToggleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_UpdateOrchestrationToggleResponse.fromResponse({});
    return msdyn_UpdateOrchestrationToggleResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_UpdateOrchestrationToggle response message
 */
export class msdyn_UpdateOrchestrationToggleResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdateOrchestrationToggleResponseData) {
    super("msdyn_UpdateOrchestrationToggle");
  }

  static fromResponse(data: unknown): msdyn_UpdateOrchestrationToggleResponse {
    return new msdyn_UpdateOrchestrationToggleResponse(
      responseObject<msdyn_UpdateOrchestrationToggleResponseData>(data)
    );
  }
}
