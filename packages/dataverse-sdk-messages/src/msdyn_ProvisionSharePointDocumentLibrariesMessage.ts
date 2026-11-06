import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ProvisionSharePointDocumentLibrariesResponse as msdyn_ProvisionSharePointDocumentLibrariesResponseData } from "./types/index.js";

/**
 * msdyn_ProvisionSharePointDocumentLibraries request message
 *
 * Web API Action: msdyn_ProvisionSharePointDocumentLibraries
 */
export class msdyn_ProvisionSharePointDocumentLibrariesRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProvisionSharePointDocumentLibrariesResponse>
{
  constructor(
    public sharePointSiteURL?: string,
    public folderStructureEntityValue?: number
  ) {
    super("msdyn_ProvisionSharePointDocumentLibraries");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionSharePointDocumentLibraries`;

    const body: Record<string, unknown> = {
      SharePointSiteURL: this.sharePointSiteURL,
      FolderStructureEntityValue: this.folderStructureEntityValue,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ProvisionSharePointDocumentLibrariesResponse> {
    const data = await response.json();
    return msdyn_ProvisionSharePointDocumentLibrariesResponse.fromResponse(data);
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
