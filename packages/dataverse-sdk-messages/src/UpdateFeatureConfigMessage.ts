import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateFeatureConfig request message
 *
 * Web API Action: UpdateFeatureConfig
 */
export class UpdateFeatureConfigRequest
  extends OrganizationRequest
  implements Executable<UpdateFeatureConfigResponse>
{
  constructor(
    public featureType: number,
    public configData: string
  ) {
    super("UpdateFeatureConfig");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateFeatureConfig`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      ConfigData: this.configData,
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

  async parseResponse(response: Response): Promise<UpdateFeatureConfigResponse> {
    // No return value (204 No Content)
    return new UpdateFeatureConfigResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      FeatureType: this.featureType,
      ConfigData: this.configData,
    };
  }
}

/**
 * UpdateFeatureConfig response message
 */
export class UpdateFeatureConfigResponse extends OrganizationResponse {
  constructor() {
    super("UpdateFeatureConfig");
  }

  static fromResponse(_data: unknown): UpdateFeatureConfigResponse {
    return new UpdateFeatureConfigResponse();
  }
}
