import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RetrieveDeploymentLicenseType request message
 *
 * Web API Function: RetrieveDeploymentLicenseType
 */
export class RetrieveDeploymentLicenseTypeRequest
  extends OrganizationRequest
  implements Executable<RetrieveDeploymentLicenseTypeResponse>
{
  constructor() {
    super("RetrieveDeploymentLicenseType");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDeploymentLicenseType`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveDeploymentLicenseTypeResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveDeploymentLicenseTypeResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDeploymentLicenseType function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveDeploymentLicenseTypeResult {
  "@odata.context"?: string;
  licenseType: string;
}

/**
 * RetrieveDeploymentLicenseType response message
 *
 * `result` is the value the RetrieveDeploymentLicenseType function returns (see {@link RetrieveDeploymentLicenseTypeResult}).
 */
export class RetrieveDeploymentLicenseTypeResponse extends OrganizationResponse {
  constructor(public result: RetrieveDeploymentLicenseTypeResult) {
    super("RetrieveDeploymentLicenseType");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDeploymentLicenseTypeResponse {
    return new RetrieveDeploymentLicenseTypeResponse(data as RetrieveDeploymentLicenseTypeResult);
  }
}
