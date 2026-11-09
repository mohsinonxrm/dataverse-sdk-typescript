import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ProvisionSharePointDocumentLibraries message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionSharePointDocumentLibrariesRequestParameters {
  SharePointSiteURL?: string;
  FolderStructureEntityValue?: number;
}

/**
 * msdyn_ProvisionSharePointDocumentLibraries request message
 *
 * Web API Action: msdyn_ProvisionSharePointDocumentLibraries
 */
export class msdyn_ProvisionSharePointDocumentLibrariesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionSharePointDocumentLibrariesResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProvisionSharePointDocumentLibrariesRequestParameters>;

  constructor(parameters: msdyn_ProvisionSharePointDocumentLibrariesRequestParameters = {}) {
    super("msdyn_ProvisionSharePointDocumentLibraries", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionSharePointDocumentLibraries`;

    const body = requestBody({
      SharePointSiteURL: this.Parameters.SharePointSiteURL,
      FolderStructureEntityValue: this.Parameters.FolderStructureEntityValue,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ProvisionSharePointDocumentLibrariesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ProvisionSharePointDocumentLibrariesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ProvisionSharePointDocumentLibraries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ProvisionSharePointDocumentLibrariesResult {
  "@odata.context"?: string;
  ProvisioningResult: string;
  ProvisioningSummary: string;
}

/**
 * msdyn_ProvisionSharePointDocumentLibraries response message
 *
 * `result` is the value the msdyn_ProvisionSharePointDocumentLibraries action returns (see {@link msdyn_ProvisionSharePointDocumentLibrariesResult}).
 */
export class msdyn_ProvisionSharePointDocumentLibrariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionSharePointDocumentLibrariesResult) {
    super("msdyn_ProvisionSharePointDocumentLibraries");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ProvisionSharePointDocumentLibrariesResponse {
    return new msdyn_ProvisionSharePointDocumentLibrariesResponse(
      data as msdyn_ProvisionSharePointDocumentLibrariesResult
    );
  }
}
