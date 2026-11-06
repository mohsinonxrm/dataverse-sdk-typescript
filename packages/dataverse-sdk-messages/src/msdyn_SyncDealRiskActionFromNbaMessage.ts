import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_SyncDealRiskActionFromNbaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SyncDealRiskActionFromNba action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SyncDealRiskActionFromNbaResult {
  "@odata.context"?: string;
  Message: string;
  Success: boolean;
}

/**
 * msdyn_SyncDealRiskActionFromNba response message
 *
 * `result` is the value the msdyn_SyncDealRiskActionFromNba action returns (see {@link msdyn_SyncDealRiskActionFromNbaResult}).
 */
export class msdyn_SyncDealRiskActionFromNbaResponse extends OrganizationResponse {
  constructor(public result: msdyn_SyncDealRiskActionFromNbaResult) {
    super("msdyn_SyncDealRiskActionFromNba");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SyncDealRiskActionFromNbaResponse {
    return new msdyn_SyncDealRiskActionFromNbaResponse(
      data as msdyn_SyncDealRiskActionFromNbaResult
    );
  }
}
