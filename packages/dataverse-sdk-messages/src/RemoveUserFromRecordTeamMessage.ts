import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { teamtemplate } from "./types/index.js";

/**
 * Parameters of the RemoveUserFromRecordTeam message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveUserFromRecordTeamRequestParameters {
  Record: EntityReference | AnyEntityPayload;
  TeamTemplate: EntityReference | EntityPayload<teamtemplate>;
}

/**
 * RemoveUserFromRecordTeam request message
 *
 * Web API Action: RemoveUserFromRecordTeam
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class RemoveUserFromRecordTeamRequest
  extends OrganizationRequest
  implements Executable<RemoveUserFromRecordTeamResponse>
{
  declare readonly Parameters: Readonly<RemoveUserFromRecordTeamRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: RemoveUserFromRecordTeamRequestParameters
  ) {
    super("RemoveUserFromRecordTeam", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.RemoveUserFromRecordTeam`;

    const body = requestBody({
      Record: this.Parameters.Record,
      TeamTemplate: this.Parameters.TeamTemplate,
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

  async parseResponse(response: Response): Promise<RemoveUserFromRecordTeamResponse> {
    // The body is the complex value, with its @odata.context
    return RemoveUserFromRecordTeamResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RemoveUserFromRecordTeam action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RemoveUserFromRecordTeamResult {
  "@odata.context"?: string;
  AccessTeamId: string;
}

/**
 * RemoveUserFromRecordTeam response message
 *
 * `result` is the value the RemoveUserFromRecordTeam action returns (see {@link RemoveUserFromRecordTeamResult}).
 */
export class RemoveUserFromRecordTeamResponse extends OrganizationResponse {
  constructor(public result: RemoveUserFromRecordTeamResult) {
    super("RemoveUserFromRecordTeam");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RemoveUserFromRecordTeamResponse {
    return new RemoveUserFromRecordTeamResponse(data as RemoveUserFromRecordTeamResult);
  }
}
