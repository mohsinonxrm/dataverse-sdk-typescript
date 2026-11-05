import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateAccountCredentials request message
 *
 * Web API Action: UpdateAccountCredentials
 */
export class UpdateAccountCredentialsRequest
  extends OrganizationRequest
  implements Executable<UpdateAccountCredentialsResponse>
{
  constructor(
    public flowmachinegroupId: string,
    public groupCredentials: string
  ) {
    super("UpdateAccountCredentials");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.UpdateAccountCredentials`;

    const body: Record<string, unknown> = {
      groupCredentials: this.groupCredentials,
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

  async parseResponse(response: Response): Promise<UpdateAccountCredentialsResponse> {
    // No return value (204 No Content)
    return new UpdateAccountCredentialsResponse();
  }
}

/**
 * UpdateAccountCredentials response message
 */
export class UpdateAccountCredentialsResponse extends OrganizationResponse {
  constructor() {
    super("UpdateAccountCredentials");
  }

  static fromResponse(_data: unknown): UpdateAccountCredentialsResponse {
    return new UpdateAccountCredentialsResponse();
  }
}
