import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type {
  AddUserToRecordTeamResponse as AddUserToRecordTeamResponseData,
  teamtemplate,
} from "./types/index.js";

/**
 * AddUserToRecordTeam request message
 *
 * Web API Action: AddUserToRecordTeam
 */
export class AddUserToRecordTeamRequest
  extends OrganizationRequest
  implements Executable<AddUserToRecordTeamResponse>
{
  constructor(
    public systemuserId: string,
    public record: EntityReference,
    public teamTemplate: teamtemplate
  ) {
    super("AddUserToRecordTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.AddUserToRecordTeam`;

    const body: Record<string, unknown> = {
      Record: this.record,
      TeamTemplate: this.teamTemplate,
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

  async parseResponse(response: Response): Promise<AddUserToRecordTeamResponse> {
    const data = await response.json();
    return AddUserToRecordTeamResponse.fromResponse(data);
  }
}

/**
 * AddUserToRecordTeam response message
 */
export class AddUserToRecordTeamResponse extends OrganizationResponse {
  constructor(public result: AddUserToRecordTeamResponseData) {
    super("AddUserToRecordTeam");
  }

  static fromResponse(data: unknown): AddUserToRecordTeamResponse {
    return new AddUserToRecordTeamResponse(responseObject<AddUserToRecordTeamResponseData>(data));
  }
}
