import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateFeatureConfig message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateFeatureConfigRequestParameters {
  FeatureType: number;
  ConfigData: string;
}

/**
 * UpdateFeatureConfig request message
 *
 * Web API Action: UpdateFeatureConfig
 */
export class UpdateFeatureConfigRequest
  extends OrganizationRequest
  implements Executable<UpdateFeatureConfigResponse>
{
  declare readonly Parameters: Readonly<UpdateFeatureConfigRequestParameters>;

  constructor(parameters: UpdateFeatureConfigRequestParameters) {
    super("UpdateFeatureConfig", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateFeatureConfig`;

    const body = requestBody({
      FeatureType: this.Parameters.FeatureType,
      ConfigData: this.Parameters.ConfigData,
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

  async parseResponse(response: Response): Promise<UpdateFeatureConfigResponse> {
    // No return value (204 No Content)
    return new UpdateFeatureConfigResponse();
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
