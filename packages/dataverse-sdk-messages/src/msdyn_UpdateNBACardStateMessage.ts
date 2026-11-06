import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateNBACardState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateNBACardStateRequestParameters {
  msdyn_SnoozeTill?: string;
  msdyn_OperationType: number;
  msdyn_NBAEntityLogicalName: string;
  msdyn_NBAEntityIds: string;
}

/**
 * msdyn_UpdateNBACardState request message
 *
 * Web API Action: msdyn_UpdateNBACardState
 */
export class msdyn_UpdateNBACardStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateNBACardStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateNBACardStateRequestParameters>;

  constructor(parameters: msdyn_UpdateNBACardStateRequestParameters) {
    super("msdyn_UpdateNBACardState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNBACardState`;

    const body = requestBody({
      msdyn_SnoozeTill: this.Parameters.msdyn_SnoozeTill,
      msdyn_OperationType: this.Parameters.msdyn_OperationType,
      msdyn_NBAEntityLogicalName: this.Parameters.msdyn_NBAEntityLogicalName,
      msdyn_NBAEntityIds: this.Parameters.msdyn_NBAEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateNBACardStateResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateNBACardStateResponse();
  }
}

/**
 * msdyn_UpdateNBACardState response message
 */
export class msdyn_UpdateNBACardStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateNBACardState");
  }

  static fromResponse(_data: unknown): msdyn_UpdateNBACardStateResponse {
    return new msdyn_UpdateNBACardStateResponse();
  }
}
