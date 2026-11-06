import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ProvisionSharePointDocumentLibraries action
 */
export interface msdyn_ProvisionSharePointDocumentLibrariesResponse {
  ProvisioningSummary: string;
  ProvisioningResult: string;
}

/**
 * msdyn_ProvisionSharePointDocumentLibraries action
 *
 * Unbound action
 */
export class msdyn_ProvisionSharePointDocumentLibrariesAction implements Executable<msdyn_ProvisionSharePointDocumentLibrariesResponse> {
  constructor(
    public readonly sharePointSiteURL?: string,
    public readonly folderStructureEntityValue?: number
  ) {}

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
    return data as msdyn_ProvisionSharePointDocumentLibrariesResponse;
  }
}
