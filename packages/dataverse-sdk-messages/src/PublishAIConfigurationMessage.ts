import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PublishAIConfiguration request message
 *
 * Web API Action: PublishAIConfiguration
 */
export class PublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<PublishAIConfigurationResponse>
{
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string,
    public source: string
  ) {
    super("PublishAIConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.PublishAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
      source: this.source,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PublishAIConfigurationResponse> {
    const data = await response.json();
    return PublishAIConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
      source: this.source,
    };
  }
}

/**
 * PublishAIConfiguration response message
 */
export class PublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: PublishAIConfigurationResponse) {
    super("PublishAIConfiguration");
  }

  static fromResponse(data: unknown): PublishAIConfigurationResponse {
    return new PublishAIConfigurationResponse((data as any).value);
  }
}
