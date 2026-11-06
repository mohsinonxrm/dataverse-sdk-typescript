import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProvisionSharePointDocumentLibrariesResponse as msdyn_ProvisionSharePointDocumentLibrariesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_ProvisionSharePointDocumentLibrariesResponse.fromResponse({});
    return msdyn_ProvisionSharePointDocumentLibrariesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProvisionSharePointDocumentLibraries response message
 */
export class msdyn_ProvisionSharePointDocumentLibrariesResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProvisionSharePointDocumentLibrariesResponseData) {
    super("msdyn_ProvisionSharePointDocumentLibraries");
  }

  static fromResponse(data: unknown): msdyn_ProvisionSharePointDocumentLibrariesResponse {
    return new msdyn_ProvisionSharePointDocumentLibrariesResponse(
      responseObject<msdyn_ProvisionSharePointDocumentLibrariesResponseData>(data)
    );
  }
}
