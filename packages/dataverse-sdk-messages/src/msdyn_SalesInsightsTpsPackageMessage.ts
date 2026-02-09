import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesInsightsTpsPackage request message
 *
 * Web API Action: msdyn_SalesInsightsTpsPackage
 */
export class msdyn_SalesInsightsTpsPackageRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesInsightsTpsPackageResponse>
{
  constructor(public skipInstall: string) {
    super("msdyn_SalesInsightsTpsPackage");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesInsightsTpsPackage`;

    const body: Record<string, unknown> = {
      skipInstall: this.skipInstall,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesInsightsTpsPackageResponse> {
    // No return value (204 No Content)
    return new msdyn_SalesInsightsTpsPackageResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      skipInstall: this.skipInstall,
    };
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
