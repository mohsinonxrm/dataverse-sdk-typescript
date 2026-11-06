import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SyncDealRiskActionFromNbaResponse as msdyn_SyncDealRiskActionFromNbaResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SyncDealRiskActionFromNba message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncDealRiskActionFromNbaRequestParameters {
  TargetEntityId?: string;
  ActionId: string;
  TargetEntityTypeName?: string;
  Action: string;
}

/**
 * msdyn_SyncDealRiskActionFromNba request message
 *
 * Web API Action: msdyn_SyncDealRiskActionFromNba
 */
export class msdyn_SyncDealRiskActionFromNbaRequest
  extends OrganizationRequest
  implements Executable<msdyn_SyncDealRiskActionFromNbaResponse>
{
  declare readonly Parameters: Readonly<msdyn_SyncDealRiskActionFromNbaRequestParameters>;

  constructor(parameters: msdyn_SyncDealRiskActionFromNbaRequestParameters) {
    super("msdyn_SyncDealRiskActionFromNba", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncDealRiskActionFromNba`;

    const body = requestBody({
      TargetEntityId: this.Parameters.TargetEntityId,
      ActionId: this.Parameters.ActionId,
      TargetEntityTypeName: this.Parameters.TargetEntityTypeName,
      Action: this.Parameters.Action,
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
    if (response.status === 204) return msdyn_SyncDealRiskActionFromNbaResponse.fromResponse({});
    return msdyn_SyncDealRiskActionFromNbaResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SyncDealRiskActionFromNba response message
 */
export class msdyn_SyncDealRiskActionFromNbaResponse extends OrganizationResponse {
  constructor(public result: msdyn_SyncDealRiskActionFromNbaResponseData) {
    super("msdyn_SyncDealRiskActionFromNba");
  }

  static fromResponse(data: unknown): msdyn_SyncDealRiskActionFromNbaResponse {
    return new msdyn_SyncDealRiskActionFromNbaResponse(
      responseObject<msdyn_SyncDealRiskActionFromNbaResponseData>(data)
    );
  }
}
