import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * ConvertOwnerTeamToAccessTeam request message
 *
 * Web API Action: ConvertOwnerTeamToAccessTeam
 *
 * The first argument is the id of the team record to call it on.
 */
export class ConvertOwnerTeamToAccessTeamRequest
  extends OrganizationRequest
  implements Executable<ConvertOwnerTeamToAccessTeamResponse>
{
  constructor(public teamId: string) {
    super("ConvertOwnerTeamToAccessTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.ConvertOwnerTeamToAccessTeam`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ConvertOwnerTeamToAccessTeamResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new ConvertOwnerTeamToAccessTeamResponse());
  }
}

/**
 * ConvertOwnerTeamToAccessTeam response message
 */
export class ConvertOwnerTeamToAccessTeamResponse extends OrganizationResponse {
  constructor() {
    super("ConvertOwnerTeamToAccessTeam");
  }

  static fromResponse(_data?: unknown): ConvertOwnerTeamToAccessTeamResponse {
    return new ConvertOwnerTeamToAccessTeamResponse();
  }
}
