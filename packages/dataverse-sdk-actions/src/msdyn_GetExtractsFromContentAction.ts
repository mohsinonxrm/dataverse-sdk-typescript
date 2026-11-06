import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetExtractsFromContent action
 */
export interface msdyn_GetExtractsFromContentResponse {
  msdyn_documents: string;
  msdyn_mdlDetails: string;
}

/**
 * Parameters of the msdyn_GetExtractsFromContent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetExtractsFromContentActionParameters {
  msdyn_extractOperationInputParams?: string;
  msdyn_userQuery?: string;
  msdyn_keywords?: string;
  msdyn_source?: string;
  msdyn_top?: number;
  msdyn_activityId?: string;
}

/**
 * msdyn_GetExtractsFromContent action
 *
 * Unbound action
 */
export class msdyn_GetExtractsFromContentAction implements Executable<msdyn_GetExtractsFromContentResponse> {
  constructor(public readonly parameters: msdyn_GetExtractsFromContentActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetExtractsFromContent`;

    const body = requestBody({
      msdyn_extractOperationInputParams: this.parameters.msdyn_extractOperationInputParams,
      msdyn_userQuery: this.parameters.msdyn_userQuery,
      msdyn_keywords: this.parameters.msdyn_keywords,
      msdyn_source: this.parameters.msdyn_source,
      msdyn_top: this.parameters.msdyn_top,
      msdyn_activityId: this.parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_GetExtractsFromContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetExtractsFromContentResponse;
    return (await response.json()) as msdyn_GetExtractsFromContentResponse;
  }
}
