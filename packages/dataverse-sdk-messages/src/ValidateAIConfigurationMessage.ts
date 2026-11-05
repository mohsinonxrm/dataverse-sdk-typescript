import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { ValidateAIConfigurationResponse as ValidateAIConfigurationResponseData } from "./types/index.js";

/**
 * ValidateAIConfiguration request message
 *
 * Web API Action: ValidateAIConfiguration
 */
export class ValidateAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<ValidateAIConfigurationResponse>
{
  constructor(
    public version: string,
    public aiconfigurationId: string
  ) {
    super("ValidateAIConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ValidateAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
      aiconfigurationId: this.aiconfigurationId,
    };

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
    const data = await response.json();
    return ValidateAIConfigurationResponse.fromResponse(data);
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
