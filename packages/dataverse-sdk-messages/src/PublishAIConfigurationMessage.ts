import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PublishAIConfigurationResponse as PublishAIConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the PublishAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PublishAIConfigurationRequestParameters {
  version: string;
  source?: string;
}

/**
 * PublishAIConfiguration request message
 *
 * Web API Action: PublishAIConfiguration
 *
 * The first argument is the id of the msdyn_aiconfiguration record to call it on.
 */
export class PublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<PublishAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<PublishAIConfigurationRequestParameters>;

  constructor(
    public msdyn_aiconfigurationId: string,
    parameters: PublishAIConfigurationRequestParameters
  ) {
    super("PublishAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.PublishAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
      source: this.Parameters.source,
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

  async parseResponse(response: Response): Promise<PublishAIConfigurationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return PublishAIConfigurationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * PublishAIConfiguration response message
 */
export class PublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: PublishAIConfigurationResponseData) {
    super("PublishAIConfiguration");
  }

  static fromResponse(data: unknown): PublishAIConfigurationResponse {
    return new PublishAIConfigurationResponse(
      responseObject<PublishAIConfigurationResponseData>(data)
    );
  }
}
