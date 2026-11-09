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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetSalesAccelerationConfigurationStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSalesAccelerationConfigurationStatusResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * Response from the msdyn_GetSalesAccelerationConfigurationStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSalesAccelerationConfigurationStatusResult {
  "@odata.context"?: string;
  IsEnabledForOrganization: boolean;
  IsEnabledForUser: boolean;
  SettingsInstance: string;
}

/**
 * msdyn_GetSalesAccelerationConfigurationStatus response message
 *
 * `result` is the value the msdyn_GetSalesAccelerationConfigurationStatus action returns (see {@link msdyn_GetSalesAccelerationConfigurationStatusResult}).
 */
export class msdyn_GetSalesAccelerationConfigurationStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesAccelerationConfigurationStatusResult) {
    super("msdyn_GetSalesAccelerationConfigurationStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSalesAccelerationConfigurationStatusResponse {
    return new msdyn_GetSalesAccelerationConfigurationStatusResponse(
      data as msdyn_GetSalesAccelerationConfigurationStatusResult
    );
  }
}
