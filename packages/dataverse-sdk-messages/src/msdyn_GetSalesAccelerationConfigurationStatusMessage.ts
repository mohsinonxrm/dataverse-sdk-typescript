import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
    const data = await response.json();
    return msdyn_GetSalesAccelerationConfigurationStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetSalesAccelerationConfigurationStatus response message
 */
export class msdyn_GetSalesAccelerationConfigurationStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAccelerationConfigurationStatusResponse) {
    super("msdyn_GetSalesAccelerationConfigurationStatus");
  }

  static fromResponse(data: unknown): msdyn_GetSalesAccelerationConfigurationStatusResponse {
    return new msdyn_GetSalesAccelerationConfigurationStatusResponse((data as any).value);
  }
}
