import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesAgent_RetrieveConfigurationResponse as msdyn_SalesAgent_RetrieveConfigurationResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesAgent_RetrieveConfigurationResponse.fromResponse({});
    return msdyn_SalesAgent_RetrieveConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesAgent_RetrieveConfiguration response message
 */
export class msdyn_SalesAgent_RetrieveConfigurationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAgent_RetrieveConfigurationResponseData) {
    super("msdyn_SalesAgent_RetrieveConfiguration");
  }

  static fromResponse(data: unknown): msdyn_SalesAgent_RetrieveConfigurationResponse {
    return new msdyn_SalesAgent_RetrieveConfigurationResponse(
      responseObject<msdyn_SalesAgent_RetrieveConfigurationResponseData>(data)
    );
  }
}
