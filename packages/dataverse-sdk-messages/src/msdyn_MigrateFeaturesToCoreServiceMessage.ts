import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_MigrateFeaturesToCoreService message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateFeaturesToCoreServiceRequestParameters {
  InputData: string;
}

/**
 * msdyn_MigrateFeaturesToCoreService request message
 *
 * Web API Action: msdyn_MigrateFeaturesToCoreService
 */
export class msdyn_MigrateFeaturesToCoreServiceRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateFeaturesToCoreServiceResponse>
{
  declare readonly Parameters: Readonly<msdyn_MigrateFeaturesToCoreServiceRequestParameters>;

  constructor(parameters: msdyn_MigrateFeaturesToCoreServiceRequestParameters) {
    super("msdyn_MigrateFeaturesToCoreService", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateFeaturesToCoreService`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_MigrateFeaturesToCoreServiceResponse> {
    // No return value (204 No Content)
    return new msdyn_MigrateFeaturesToCoreServiceResponse();
  }
}

/**
 * msdyn_MigrateFeaturesToCoreService response message
 */
export class msdyn_MigrateFeaturesToCoreServiceResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MigrateFeaturesToCoreService");
  }

  static fromResponse(_data: unknown): msdyn_MigrateFeaturesToCoreServiceResponse {
    return new msdyn_MigrateFeaturesToCoreServiceResponse();
  }
}
