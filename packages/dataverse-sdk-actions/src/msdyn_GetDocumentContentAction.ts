import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetDocumentContent action
 */
export interface msdyn_GetDocumentContentResponse {
  msdyn_data: string;
  msdyn_mdlDetails: string;
}

/**
 * Parameters of the msdyn_GetDocumentContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDocumentContentActionParameters {
  msdyn_documents: string;
  msdyn_activityId?: string;
  msdyn_type: string;
  msdyn_userQuery?: string;
  msdyn_shouldUpload?: boolean;
  msdyn_keywords?: string;
}

/**
 * msdyn_GetDocumentContent action
 *
 * Unbound action
 */
export class msdyn_GetDocumentContentAction implements Executable<msdyn_GetDocumentContentResponse> {
  constructor(public readonly parameters: msdyn_GetDocumentContentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDocumentContent`;

    const body = requestBody({
      msdyn_documents: this.parameters.msdyn_documents,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_type: this.parameters.msdyn_type,
      msdyn_userQuery: this.parameters.msdyn_userQuery,
      msdyn_shouldUpload: this.parameters.msdyn_shouldUpload,
      msdyn_keywords: this.parameters.msdyn_keywords,
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

  async parseResponse(response: Response): Promise<msdyn_GetDocumentContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetDocumentContentResponse;
    return (await response.json()) as msdyn_GetDocumentContentResponse;
  }
}
