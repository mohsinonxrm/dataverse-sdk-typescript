import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { ValidateAIConfigurationResponse as ValidateAIConfigurationResponseData } from "./types/index.js";

/**
 * Parameters of the ValidateAIConfiguration message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateAIConfigurationRequestParameters {
  version: string;
  aiconfigurationId: string;
}

/**
 * ValidateAIConfiguration request message
 *
 * Web API Action: ValidateAIConfiguration
 */
export class ValidateAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<ValidateAIConfigurationResponse>
{
  declare readonly Parameters: Readonly<ValidateAIConfigurationRequestParameters>;

  constructor(parameters: ValidateAIConfigurationRequestParameters) {
    super("ValidateAIConfiguration", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateAIConfiguration`;

    const body = requestBody({
      version: this.Parameters.version,
      aiconfigurationId: this.Parameters.aiconfigurationId,
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

  async parseResponse(response: Response): Promise<ValidateAIConfigurationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return ValidateAIConfigurationResponse.fromResponse({});
    return ValidateAIConfigurationResponse.fromResponse(await response.json());
  }
}

/**
 * ValidateAIConfiguration response message
 */
export class ValidateAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: ValidateAIConfigurationResponseData) {
    super("ValidateAIConfiguration");
  }

  static fromResponse(data: unknown): ValidateAIConfigurationResponse {
    return new ValidateAIConfigurationResponse(
      responseObject<ValidateAIConfigurationResponseData>(data)
    );
  }
}
