import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { teamtemplate } from "./types/index.js";

/**
 * RemoveUserFromRecordTeam request message
 *
 * Web API Action: RemoveUserFromRecordTeam
 */
export class RemoveUserFromRecordTeamRequest
  extends OrganizationRequest
  implements Executable<RemoveUserFromRecordTeamResponse>
{
  constructor(
    public systemuserId: string,
    public record: EntityReference,
    public teamTemplate: teamtemplate
  ) {
    super("RemoveUserFromRecordTeam");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RemoveUserFromRecordTeam`;

    const body: Record<string, unknown> = {
      Record: this.record,
      TeamTemplate: this.teamTemplate,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveUserFromRecordTeamResponse> {
    const data = await response.json();
    return RemoveUserFromRecordTeamResponse.fromResponse(data);
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
 * RemoveUserFromRecordTeam response message
 */
export class RemoveUserFromRecordTeamResponse extends OrganizationResponse {
  constructor(public result: RemoveUserFromRecordTeamResponse) {
    super("RemoveUserFromRecordTeam");
  }

  static fromResponse(data: unknown): RemoveUserFromRecordTeamResponse {
    return new RemoveUserFromRecordTeamResponse((data as any).value);
  }
}
