import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SyncLeadActionFromNbaResponse as msdyn_SyncLeadActionFromNbaResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SyncLeadActionFromNbaResponse.fromResponse({});
    return msdyn_SyncLeadActionFromNbaResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SyncLeadActionFromNba response message
 */
export class msdyn_SyncLeadActionFromNbaResponse extends OrganizationResponse {
  constructor(public result: msdyn_SyncLeadActionFromNbaResponseData) {
    super("msdyn_SyncLeadActionFromNba");
  }

  static fromResponse(data: unknown): msdyn_SyncLeadActionFromNbaResponse {
    return new msdyn_SyncLeadActionFromNbaResponse(
      responseObject<msdyn_SyncLeadActionFromNbaResponseData>(data)
    );
  }
}
