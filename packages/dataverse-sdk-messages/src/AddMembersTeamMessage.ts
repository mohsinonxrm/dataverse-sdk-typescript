import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { systemuser } from "./types/index.js";

/**
 * Parameters of the AddMembersTeam message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddMembersTeamRequestParameters {
  Members: (EntityReference | EntityPayload<systemuser>)[];
}

/**
 * AddMembersTeam request message
 *
 * Web API Action: AddMembersTeam
 *
 * The first argument is the id of the team record to call it on.
 */
export class AddMembersTeamRequest
  extends OrganizationRequest
  implements Executable<AddMembersTeamResponse>
{
  declare readonly Parameters: Readonly<AddMembersTeamRequestParameters>;

  constructor(
    public teamId: string,
    parameters: AddMembersTeamRequestParameters
  ) {
    super("AddMembersTeam", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.AddMembersTeam`;

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

  async parseResponse(response: Response): Promise<AddMembersTeamResponse> {
    // No return value (204 No Content)
    return new AddMembersTeamResponse();
  }
}

/**
 * AddMembersTeam response message
 */
export class AddMembersTeamResponse extends OrganizationResponse {
  constructor() {
    super("AddMembersTeam");
  }

  static fromResponse(_data: unknown): AddMembersTeamResponse {
    return new AddMembersTeamResponse();
  }
}
