import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { teamtemplate } from "./types/index.js";

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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.systemuserId,
      Record: this.record,
      TeamTemplate: this.teamTemplate,
    };
  }
}

/**
 * AddUserToRecordTeam response message
 */
export class AddUserToRecordTeamResponse extends OrganizationResponse {
  constructor(public result: AddUserToRecordTeamResponse) {
    super("AddUserToRecordTeam");
  }

  static fromResponse(data: unknown): AddUserToRecordTeamResponse {
    return new AddUserToRecordTeamResponse((data as any).value);
  }
}
