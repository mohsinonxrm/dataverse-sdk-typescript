import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the SetFeatureStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetFeatureStatusRequestParameters {
  FeatureType: number;
  Status: boolean;
  ConfigData?: string;
  IsSolutionUninstall?: boolean;
}

/**
 * SetFeatureStatus request message
 *
 * Web API Action: SetFeatureStatus
 */
export class SetFeatureStatusRequest
  extends OrganizationRequest
  implements Executable<SetFeatureStatusResponse>
{
  declare readonly Parameters: Readonly<SetFeatureStatusRequestParameters>;

  constructor(parameters: SetFeatureStatusRequestParameters) {
    super("SetFeatureStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetFeatureStatus`;

    const body = requestBody({
      FeatureType: this.Parameters.FeatureType,
      Status: this.Parameters.Status,
      ConfigData: this.Parameters.ConfigData,
      IsSolutionUninstall: this.Parameters.IsSolutionUninstall,
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
