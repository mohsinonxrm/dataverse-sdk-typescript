import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesAgent_RetrieveConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAgent_RetrieveConfigurationRequestParameters {
  Fields?: string[];
  ProfileId?: string;
  FeatureName: string;
}

/**
 * msdyn_SalesAgent_RetrieveConfiguration request message
 *
 * Web API Action: msdyn_SalesAgent_RetrieveConfiguration
 */
export class msdyn_SalesAgent_RetrieveConfigurationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAgent_RetrieveConfigurationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesAgent_RetrieveConfigurationRequestParameters>;

  constructor(parameters: msdyn_SalesAgent_RetrieveConfigurationRequestParameters) {
    super("msdyn_SalesAgent_RetrieveConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgent_RetrieveConfiguration`;

    const body = requestBody({
      Fields: this.Parameters.Fields,
      ProfileId: this.Parameters.ProfileId,
      FeatureName: this.Parameters.FeatureName,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgent_RetrieveConfigurationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesAgent_RetrieveConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesAgent_RetrieveConfiguration action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAgent_RetrieveConfigurationResult {
  "@odata.context"?: string;
  FeatureName: string;
  Fields: string;
  Message: string;
  ProfileId: string;
  Success: boolean;
}

/**
 * msdyn_SalesAgent_RetrieveConfiguration response message
 *
 * `result` is the value the msdyn_SalesAgent_RetrieveConfiguration action returns (see {@link msdyn_SalesAgent_RetrieveConfigurationResult}).
 */
export class msdyn_SalesAgent_RetrieveConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_RetrieveConfigurationResult) {
    super("msdyn_SalesAgent_RetrieveConfiguration");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesAgent_RetrieveConfigurationResponse {
    return new msdyn_SalesAgent_RetrieveConfigurationResponse(
      data as msdyn_SalesAgent_RetrieveConfigurationResult
    );
  }
}
