import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetFeatureStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetFeatureStatusRequestParameters {
  FeatureType?: number;
  Status?: boolean;
  IsSolutionUninstall?: boolean;
  ConfigurationData?: string;
}

/**
 * msdyn_SetFeatureStatus request message
 *
 * Web API Action: msdyn_SetFeatureStatus
 */
export class msdyn_SetFeatureStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetFeatureStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetFeatureStatusRequestParameters>;

  constructor(parameters: msdyn_SetFeatureStatusRequestParameters = {}) {
    super("msdyn_SetFeatureStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetFeatureStatus`;

    const body = requestBody({
      FeatureType: this.Parameters.FeatureType,
      Status: this.Parameters.Status,
      IsSolutionUninstall: this.Parameters.IsSolutionUninstall,
      ConfigurationData: this.Parameters.ConfigurationData,
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
