import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SyncLeadActionFromNba action
 */
export interface msdyn_SyncLeadActionFromNbaResponse {
  Message: string;
  Retryable: boolean;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SyncLeadActionFromNba action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncLeadActionFromNbaActionParameters {
  Action: string;
  TargetEntityTypeName?: string;
  ActionId: string;
  TargetEntityId?: string;
}

/**
 * msdyn_SyncLeadActionFromNba action
 *
 * Unbound action
 */
export class msdyn_SyncLeadActionFromNbaAction implements Executable<msdyn_SyncLeadActionFromNbaResponse> {
  constructor(public readonly parameters: msdyn_SyncLeadActionFromNbaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncLeadActionFromNba`;

    const body = requestBody({
      Action: this.parameters.Action,
      TargetEntityTypeName: this.parameters.TargetEntityTypeName,
      ActionId: this.parameters.ActionId,
      TargetEntityId: this.parameters.TargetEntityId,
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

  async parseResponse(response: Response): Promise<msdyn_SyncLeadActionFromNbaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SyncLeadActionFromNbaResponse;
    return (await response.json()) as msdyn_SyncLeadActionFromNbaResponse;
  }
}
