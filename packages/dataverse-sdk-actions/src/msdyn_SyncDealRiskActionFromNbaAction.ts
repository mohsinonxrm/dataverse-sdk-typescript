import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SyncDealRiskActionFromNba action
 */
export interface msdyn_SyncDealRiskActionFromNbaResponse {
  Message: string;
  Success: boolean;
}

/**
 * Parameters of the msdyn_SyncDealRiskActionFromNba action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncDealRiskActionFromNbaActionParameters {
  TargetEntityId?: string;
  ActionId: string;
  TargetEntityTypeName?: string;
  Action: string;
}

/**
 * msdyn_SyncDealRiskActionFromNba action
 *
 * Unbound action
 */
export class msdyn_SyncDealRiskActionFromNbaAction implements Executable<msdyn_SyncDealRiskActionFromNbaResponse> {
  constructor(public readonly parameters: msdyn_SyncDealRiskActionFromNbaActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncDealRiskActionFromNba`;

    const body = requestBody({
      TargetEntityId: this.parameters.TargetEntityId,
      ActionId: this.parameters.ActionId,
      TargetEntityTypeName: this.parameters.TargetEntityTypeName,
      Action: this.parameters.Action,
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

  async parseResponse(response: Response): Promise<msdyn_SyncDealRiskActionFromNbaResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SyncDealRiskActionFromNbaResponse;
    return (await response.json()) as msdyn_SyncDealRiskActionFromNbaResponse;
  }
}
