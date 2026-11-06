import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SyncLeadActionFromNba message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SyncLeadActionFromNbaRequestParameters {
  Action: string;
  TargetEntityTypeName?: string;
  ActionId: string;
  TargetEntityId?: string;
}

/**
 * msdyn_SyncLeadActionFromNba request message
 *
 * Web API Action: msdyn_SyncLeadActionFromNba
 */
export class msdyn_SyncLeadActionFromNbaRequest
  extends OrganizationRequest
  implements Executable<msdyn_SyncLeadActionFromNbaResponse>
{
  declare readonly Parameters: Readonly<msdyn_SyncLeadActionFromNbaRequestParameters>;

  constructor(parameters: msdyn_SyncLeadActionFromNbaRequestParameters) {
    super("msdyn_SyncLeadActionFromNba", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SyncLeadActionFromNba`;

    const body = requestBody({
      Action: this.Parameters.Action,
      TargetEntityTypeName: this.Parameters.TargetEntityTypeName,
      ActionId: this.Parameters.ActionId,
      TargetEntityId: this.Parameters.TargetEntityId,
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
    // The body is the complex value, with its @odata.context
    return msdyn_SyncLeadActionFromNbaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SyncLeadActionFromNba action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SyncLeadActionFromNbaResult {
  "@odata.context"?: string;
  Message: string;
  Retryable: boolean;
  Success: boolean;
}

/**
 * msdyn_SyncLeadActionFromNba response message
 *
 * `result` is the value the msdyn_SyncLeadActionFromNba action returns (see {@link msdyn_SyncLeadActionFromNbaResult}).
 */
export class msdyn_SyncLeadActionFromNbaResponse extends OrganizationResponse {
  constructor(public result: msdyn_SyncLeadActionFromNbaResult) {
    super("msdyn_SyncLeadActionFromNba");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SyncLeadActionFromNbaResponse {
    return new msdyn_SyncLeadActionFromNbaResponse(data as msdyn_SyncLeadActionFromNbaResult);
  }
}
