import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateSuggestedActivity action
 */
export interface msdyn_CreateSuggestedActivityResponse {
  id: string;
  failedRecordCount: string;
}

/**
 * Parameters of the msdyn_CreateSuggestedActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedActivityActionParameters {
  SuggestedActivityId: string;
  RegardingObjectId: string;
  RegardingObjectEntity: string;
  IsAdminConsented?: boolean;
}

/**
 * msdyn_CreateSuggestedActivity action
 *
 * Unbound action
 */
export class msdyn_CreateSuggestedActivityAction implements Executable<msdyn_CreateSuggestedActivityResponse> {
  constructor(public readonly parameters: msdyn_CreateSuggestedActivityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedActivity`;

    const body = requestBody({
      SuggestedActivityId: this.parameters.SuggestedActivityId,
      RegardingObjectId: this.parameters.RegardingObjectId,
      RegardingObjectEntity: this.parameters.RegardingObjectEntity,
      IsAdminConsented: this.parameters.IsAdminConsented,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CreateSuggestedActivityResponse;
    return (await response.json()) as msdyn_CreateSuggestedActivityResponse;
  }
}
