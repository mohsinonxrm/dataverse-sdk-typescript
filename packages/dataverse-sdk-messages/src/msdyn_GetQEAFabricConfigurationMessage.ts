import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetQEAFabricConfiguration request message
 *
 * Web API Action: msdyn_GetQEAFabricConfiguration
 */
export class msdyn_GetQEAFabricConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetQEAFabricConfigurationResponse>
{
  constructor() {
    super("msdyn_GetQEAFabricConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetQEAFabricConfiguration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetQEAFabricConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetQEAFabricConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetQEAFabricConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetQEAFabricConfigurationResult {
  "@odata.context"?: string;
  Configuration: string;
}

/**
 * msdyn_GetQEAFabricConfiguration response message
 *
 * `result` is the value the msdyn_GetQEAFabricConfiguration action returns (see {@link msdyn_GetQEAFabricConfigurationResult}).
 */
export class msdyn_GetQEAFabricConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetQEAFabricConfigurationResult) {
    super("msdyn_GetQEAFabricConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetQEAFabricConfigurationResponse {
    return new msdyn_GetQEAFabricConfigurationResponse(
      data as msdyn_GetQEAFabricConfigurationResult
    );
  }
}
