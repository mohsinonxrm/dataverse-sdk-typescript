import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { businessunit } from "./types/index.js";

/**
 * Parameters of the SetParentTeam message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetParentTeamRequestParameters {
  BusinessUnit: EntityReference | EntityPayload<businessunit>;
  DoNotMoveAllRecords?: boolean;
}

/**
 * SetParentTeam request message
 *
 * Web API Action: SetParentTeam
 *
 * The first argument is the id of the team record to call it on.
 */
export class SetParentTeamRequest
  extends OrganizationRequest
  implements Executable<SetParentTeamResponse>
{
  declare readonly Parameters: Readonly<SetParentTeamRequestParameters>;

  constructor(
    public teamId: string,
    parameters: SetParentTeamRequestParameters
  ) {
    super("SetParentTeam", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/teams(${this.teamId})/Microsoft.Dynamics.CRM.SetParentTeam`;

    const body = requestBody({
      BusinessUnit: this.Parameters.BusinessUnit,
      DoNotMoveAllRecords: this.Parameters.DoNotMoveAllRecords,
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

  parseResponse(_response: Response): Promise<SetParentTeamResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new SetParentTeamResponse());
  }
}

/**
 * SetParentTeam response message
 */
export class SetParentTeamResponse extends OrganizationResponse {
  constructor() {
    super("SetParentTeam");
  }

  static fromResponse(_data?: unknown): SetParentTeamResponse {
    return new SetParentTeamResponse();
  }
}
