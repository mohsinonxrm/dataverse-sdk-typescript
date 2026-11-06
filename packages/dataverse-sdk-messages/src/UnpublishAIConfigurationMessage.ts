import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { UnpublishAIConfigurationResponse as UnpublishAIConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the UnpublishAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnpublishAIConfigurationRequestParameters {
  version: string;
}

/**
 * UnpublishAIConfiguration request message
 *
 * Web API Action: UnpublishAIConfiguration
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class UnpublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<UnpublishAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<UnpublishAIConfigurationRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: UnpublishAIConfigurationRequestParameters
  ) {
    super("UnpublishAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnpublishAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
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

  async parseResponse(response: Response): Promise<UnpublishAIConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return UnpublishAIConfigurationResponse.fromResponse({});
    return UnpublishAIConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * UnpublishAIConfiguration response message
 */
export class UnpublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: UnpublishAIConfigurationResponseData) {
    super("UnpublishAIConfiguration");
  }

  static fromResponse(data: unknown): UnpublishAIConfigurationResponse {
    return new UnpublishAIConfigurationResponse(
      responseObject<UnpublishAIConfigurationResponseData>(data)
    );
  }
}
