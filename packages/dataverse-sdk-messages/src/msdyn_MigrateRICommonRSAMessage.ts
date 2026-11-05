import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_MigrateRICommonRSA request message
 *
 * Web API Action: msdyn_MigrateRICommonRSA
 */
export class msdyn_MigrateRICommonRSARequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateRICommonRSAResponse>
{
  constructor(public inputData: string) {
    super("msdyn_MigrateRICommonRSA");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateRICommonRSA`;

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

  async parseResponse(response: Response): Promise<msdyn_MigrateRICommonRSAResponse> {
    // No return value (204 No Content)
    return new msdyn_MigrateRICommonRSAResponse();
  }
}

/**
 * msdyn_MigrateRICommonRSA response message
 */
export class msdyn_MigrateRICommonRSAResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MigrateRICommonRSA");
  }

  static fromResponse(_data: unknown): msdyn_MigrateRICommonRSAResponse {
    return new msdyn_MigrateRICommonRSAResponse();
  }
}
