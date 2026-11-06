import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ProvisionSharePointDocumentLibraries action
 */
export interface msdyn_ProvisionSharePointDocumentLibrariesResponse {
  ProvisioningSummary: string;
  ProvisioningResult: string;
}

/**
 * Parameters of the msdyn_ProvisionSharePointDocumentLibraries action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProvisionSharePointDocumentLibrariesActionParameters {
  SharePointSiteURL?: string;
  FolderStructureEntityValue?: number;
}

/**
 * msdyn_ProvisionSharePointDocumentLibraries action
 *
 * Unbound action
 */
export class msdyn_ProvisionSharePointDocumentLibrariesAction implements Executable<msdyn_ProvisionSharePointDocumentLibrariesResponse> {
  constructor(
    public readonly parameters: msdyn_ProvisionSharePointDocumentLibrariesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProvisionSharePointDocumentLibraries`;

    const body = requestBody({
      SharePointSiteURL: this.parameters.SharePointSiteURL,
      FolderStructureEntityValue: this.parameters.FolderStructureEntityValue,
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
    if (response.status === 204) return {} as msdyn_ProvisionSharePointDocumentLibrariesResponse;
    return (await response.json()) as msdyn_ProvisionSharePointDocumentLibrariesResponse;
  }
}
