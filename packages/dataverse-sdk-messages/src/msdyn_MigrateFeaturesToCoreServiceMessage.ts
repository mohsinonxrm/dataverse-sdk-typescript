import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MigrateFeaturesToCoreService request message
 *
 * Web API Action: msdyn_MigrateFeaturesToCoreService
 */
export class msdyn_MigrateFeaturesToCoreServiceRequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateFeaturesToCoreServiceResponse>
{
  constructor(public inputData: string) {
    super("msdyn_MigrateFeaturesToCoreService");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateFeaturesToCoreService`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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
