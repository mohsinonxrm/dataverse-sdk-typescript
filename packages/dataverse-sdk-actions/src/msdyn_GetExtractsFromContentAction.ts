import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetExtractsFromContent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetExtractsFromContentResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetExtractsFromContentResponse;
  }
}
