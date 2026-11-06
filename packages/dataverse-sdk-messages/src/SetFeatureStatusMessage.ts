import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * SetFeatureStatus request message
 *
 * Web API Action: SetFeatureStatus
 */
export class SetFeatureStatusRequest
  extends OrganizationRequest
  implements Executable<SetFeatureStatusResponse>
{
  constructor(
    public featureType: number,
    public status: boolean,
    public configData?: string,
    public isSolutionUninstall?: boolean
  ) {
    super("SetFeatureStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetFeatureStatus`;

    const body: Record<string, unknown> = {
      FeatureType: this.featureType,
      Status: this.status,
      ConfigData: this.configData,
      IsSolutionUninstall: this.isSolutionUninstall,
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

  async parseResponse(response: Response): Promise<SetFeatureStatusResponse> {
    // No return value (204 No Content)
    return new SetFeatureStatusResponse();
  }
}

/**
 * SetFeatureStatus response message
 */
export class SetFeatureStatusResponse extends OrganizationResponse {
  constructor() {
    super("SetFeatureStatus");
  }

  static fromResponse(_data: unknown): SetFeatureStatusResponse {
    return new SetFeatureStatusResponse();
  }
}
