import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UnpublishAIConfiguration request message
 *
 * Web API Action: UnpublishAIConfiguration
 */
export class UnpublishAIConfigurationRequest
  extends OrganizationRequest
  implements Executable<UnpublishAIConfigurationResponse>
{
  constructor(
    public msdyn_aiconfigurationId: string,
    public version: string
  ) {
    super("UnpublishAIConfiguration");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_aiconfigurations(${this.msdyn_aiconfigurationId})/Microsoft.Dynamics.CRM.UnpublishAIConfiguration`;

    const body: Record<string, unknown> = {
      version: this.version,
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

  async parseResponse(response: Response): Promise<UnpublishAIConfigurationResponse> {
    const data = await response.json();
    return UnpublishAIConfigurationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_aiconfigurationId,
      version: this.version,
    };
  }
}

/**
 * UnpublishAIConfiguration response message
 */
export class UnpublishAIConfigurationResponse extends OrganizationResponse {
  constructor(public result: UnpublishAIConfigurationResponse) {
    super("UnpublishAIConfiguration");
  }

  static fromResponse(data: unknown): UnpublishAIConfigurationResponse {
    return new UnpublishAIConfigurationResponse((data as any).value);
  }
}
