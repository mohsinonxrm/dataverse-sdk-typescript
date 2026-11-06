import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesInsightsTpsPackage message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesInsightsTpsPackageRequestParameters {
  skipInstall: string;
}

/**
 * msdyn_SalesInsightsTpsPackage request message
 *
 * Web API Action: msdyn_SalesInsightsTpsPackage
 */
export class msdyn_SalesInsightsTpsPackageRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesInsightsTpsPackageResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesInsightsTpsPackageRequestParameters>;

  constructor(parameters: msdyn_SalesInsightsTpsPackageRequestParameters) {
    super("msdyn_SalesInsightsTpsPackage", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsTpsPackage`;

    const body = requestBody({
      skipInstall: this.Parameters.skipInstall,
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

  async parseResponse(response: Response): Promise<msdyn_SalesInsightsTpsPackageResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesInsightsTpsPackageResponse();
  }
}

/**
 * msdyn_SalesInsightsTpsPackage response message
 */
export class msdyn_SalesInsightsTpsPackageResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SalesInsightsTpsPackage");
  }

  static fromResponse(_data: unknown): msdyn_SalesInsightsTpsPackageResponse {
    return new msdyn_SalesInsightsTpsPackageResponse();
  }
}
