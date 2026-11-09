import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_MigrateRICommonRSA message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MigrateRICommonRSARequestParameters {
  InputData: string;
}

/**
 * msdyn_MigrateRICommonRSA request message
 *
 * Web API Action: msdyn_MigrateRICommonRSA
 */
export class msdyn_MigrateRICommonRSARequest
  extends OrganizationRequest
  implements Executable<msdyn_MigrateRICommonRSAResponse>
{
  declare readonly Parameters: Readonly<msdyn_MigrateRICommonRSARequestParameters>;

  constructor(parameters: msdyn_MigrateRICommonRSARequestParameters) {
    super("msdyn_MigrateRICommonRSA", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MigrateRICommonRSA`;

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

  parseResponse(_response: Response): Promise<msdyn_MigrateRICommonRSAResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_MigrateRICommonRSAResponse());
  }
}

/**
 * msdyn_MigrateRICommonRSA response message
 */
export class msdyn_MigrateRICommonRSAResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_MigrateRICommonRSA");
  }

  static fromResponse(_data?: unknown): msdyn_MigrateRICommonRSAResponse {
    return new msdyn_MigrateRICommonRSAResponse();
  }
}
