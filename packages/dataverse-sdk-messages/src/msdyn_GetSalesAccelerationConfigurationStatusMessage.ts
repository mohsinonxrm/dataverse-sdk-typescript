import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetSalesAccelerationConfigurationStatusResponse as msdyn_GetSalesAccelerationConfigurationStatusResponseData } from "./types/index.js";

/**
 * msdyn_GetSalesAccelerationConfigurationStatus request message
 *
 * Web API Action: msdyn_GetSalesAccelerationConfigurationStatus
 */
export class msdyn_GetSalesAccelerationConfigurationStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesAccelerationConfigurationStatusResponse>
{
  constructor() {
    super("msdyn_GetSalesAccelerationConfigurationStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesAccelerationConfigurationStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
    const data = await response.json();
    return msdyn_GetSalesAccelerationConfigurationStatusResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetSalesAccelerationConfigurationStatus response message
 */
export class msdyn_GetSalesAccelerationConfigurationStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAccelerationConfigurationStatusResponseData) {
    super("msdyn_GetSalesAccelerationConfigurationStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSalesAccelerationConfigurationStatusResponse {
    return new msdyn_GetSalesAccelerationConfigurationStatusResponse(
      responseObject<msdyn_GetSalesAccelerationConfigurationStatusResponseData>(data)
    );
  }
}
