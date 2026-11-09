import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgent_UpdateConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_UpdateConfigurationRequestParameters {
  FeatureName?: string;
  ProfileId?: string;
  RequestJson: string;
}

/**
 * msdyn_SalesAgent_UpdateConfiguration request message
 *
 * Web API Action: msdyn_SalesAgent_UpdateConfiguration
 */
export class msdyn_SalesAgent_UpdateConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_UpdateConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_UpdateConfigurationRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_UpdateConfigurationRequestParameters) {
    super("msdyn_SalesAgent_UpdateConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_UpdateConfiguration`;

    const body = requestBody({
      FeatureName: this.Parameters.FeatureName,
      ProfileId: this.Parameters.ProfileId,
      RequestJson: this.Parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_UpdateConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgent_UpdateConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgent_UpdateConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_UpdateConfigurationResult {
  "@odata.context"?: string;
  FeatureName: string;
  Message: string;
  ProfileId: string;
  Success: boolean;
}

/**
 * msdyn_SalesAgent_UpdateConfiguration response message
 *
 * `result` is the value the msdyn_SalesAgent_UpdateConfiguration action returns (see {@link msdyn_SalesAgent_UpdateConfigurationResult}).
 */
export class msdyn_SalesAgent_UpdateConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_UpdateConfigurationResult) {
    super("msdyn_SalesAgent_UpdateConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgent_UpdateConfigurationResponse {
    return new msdyn_SalesAgent_UpdateConfigurationResponse(
      data as msdyn_SalesAgent_UpdateConfigurationResult
    );
  }
}
