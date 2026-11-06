import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Parameters of the RemoveMembersTeam message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveMembersTeamRequestParameters {
  Members: (EntityReference | EntityPayload<systemuser>)[];
}

/**
 * RemoveMembersTeam request message
 *
 * Web API Action: RemoveMembersTeam
 *
 * The first argument is the id of the team record to call it on.
 */
export class RemoveMembersTeamRequest
  extends OrganizationRequest
  implements Executable<RemoveMembersTeamResponse>
{
  declare readonly Parameters: Readonly<RemoveMembersTeamRequestParameters>;

  constructor(
    public teamId: string,
    parameters: RemoveMembersTeamRequestParameters
  ) {
    super("RemoveMembersTeam", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.RemoveMembersTeam`;

    const body = requestBody({
      Members: this.Parameters.Members,
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

  async parseResponse(response: Response): Promise<RemoveMembersTeamResponse> {
    // No return value (204 No Content)
    return new RemoveMembersTeamResponse();
  }
}

/**
 * RemoveMembersTeam response message
 */
export class RemoveMembersTeamResponse extends OrganizationResponse {
  constructor() {
    super("RemoveMembersTeam");
  }

  static fromResponse(_data: unknown): RemoveMembersTeamResponse {
    return new RemoveMembersTeamResponse();
  }
}
