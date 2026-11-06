import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SetFeatureStatus request message
 *
 * Web API Action: msdyn_SetFeatureStatus
 */
export class msdyn_SetFeatureStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetFeatureStatusResponse>
{
  constructor(
    public featureType: number,
    public status: boolean,
    public isSolutionUninstall: boolean,
    public configurationData: string
  ) {
    super("msdyn_SetFeatureStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetFeatureStatus`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      Status: this.status,
      IsSolutionUninstall: this.isSolutionUninstall,
      ConfigurationData: this.configurationData,
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

  async parseResponse(response: Response): Promise<msdyn_SetFeatureStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_SetFeatureStatusResponse();
  }
}

/**
 * msdyn_SetFeatureStatus response message
 */
export class msdyn_SetFeatureStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetFeatureStatus");
  }

  static fromResponse(_data: unknown): msdyn_SetFeatureStatusResponse {
    return new msdyn_SetFeatureStatusResponse();
  }
}
