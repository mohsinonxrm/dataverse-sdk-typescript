import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetExtractsFromContent action
 */
export interface msdyn_GetExtractsFromContentResponse {
  msdyn_documents: string;
  msdyn_mdlDetails: string;
}

/**
 * msdyn_GetExtractsFromContent action
 *
 * Unbound action
 */
export class msdyn_GetExtractsFromContentAction implements Executable<msdyn_GetExtractsFromContentResponse> {
  constructor(
    public readonly msdyn_activityId?: string,
    public readonly msdyn_userQuery?: string,
    public readonly msdyn_source?: string,
    public readonly msdyn_top?: number,
    public readonly msdyn_extractOperationInputParams?: string,
    public readonly msdyn_keywords?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExtractsFromContent`;

    const body: Record<string, unknown> = {
      msdyn_activityId: this.msdyn_activityId,
      msdyn_userQuery: this.msdyn_userQuery,
      msdyn_source: this.msdyn_source,
      msdyn_top: this.msdyn_top,
      msdyn_extractOperationInputParams: this.msdyn_extractOperationInputParams,
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

  async parseResponse(response: Response): Promise<msdyn_GetExtractsFromContentResponse> {
    const data = await response.json();
    return data as msdyn_GetExtractsFromContentResponse;
  }
}
