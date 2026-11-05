import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetDocumentContent action
 */
export interface msdyn_GetDocumentContentResponse {
  msdyn_data: string;
  msdyn_mdlDetails: string;
}

/**
 * msdyn_GetDocumentContent action
 *
 * Unbound action
 */
export class msdyn_GetDocumentContentAction implements Executable<msdyn_GetDocumentContentResponse> {
  constructor(
    public readonly msdyn_documents: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_type: string,
    public readonly msdyn_userQuery: string,
    public readonly msdyn_shouldUpload: boolean,
    public readonly msdyn_keywords: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDocumentContent`;

    const body: Record<string, unknown> = {
      msdyn_documents: this.msdyn_documents,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_type: this.msdyn_type,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_shouldUpload: this.msdyn_shouldUpload,
      msdyn_keywords: this.msdyn_keywords,
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

  async parseResponse(response: Response): Promise<msdyn_GetDocumentContentResponse> {
    const data = await response.json();
    return data as msdyn_GetDocumentContentResponse;
  }
}
