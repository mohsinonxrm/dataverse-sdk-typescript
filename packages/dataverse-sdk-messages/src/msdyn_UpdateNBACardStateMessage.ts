import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateNBACardState request message
 *
 * Web API Action: msdyn_UpdateNBACardState
 */
export class msdyn_UpdateNBACardStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateNBACardStateResponse>
{
  constructor(
    public msdyn_SnoozeTill: string,
    public msdyn_OperationType: number,
    public msdyn_NBAEntityLogicalName: string,
    public msdyn_NBAEntityIds: string
  ) {
    super("msdyn_UpdateNBACardState");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNBACardState`;

    const body: Record<string, unknown> = {
      msdyn_SnoozeTill: this.msdyn_SnoozeTill,
      msdyn_OperationType: this.msdyn_OperationType,
      msdyn_NBAEntityLogicalName: this.msdyn_NBAEntityLogicalName,
      msdyn_NBAEntityIds: this.msdyn_NBAEntityIds,
    };

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
