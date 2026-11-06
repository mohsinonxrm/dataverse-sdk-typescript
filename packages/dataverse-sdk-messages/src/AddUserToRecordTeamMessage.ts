import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  AddUserToRecordTeamResponse as AddUserToRecordTeamResponseData,
  teamtemplate,
} from "./types/index.js";

/**
 * Parameters of the AddUserToRecordTeam message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddUserToRecordTeamRequestParameters {
  Record: EntityReference | AnyEntityPayload;
  TeamTemplate: EntityReference | EntityPayload<teamtemplate>;
}

/**
 * AddUserToRecordTeam request message
 *
 * Web API Action: AddUserToRecordTeam
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class AddUserToRecordTeamRequest
  extends OrganizationRequest
  implements Executable<AddUserToRecordTeamResponse>
{
  declare readonly Parameters: Readonly<AddUserToRecordTeamRequestParameters>;

  constructor(
    public systemuserId: string,
    parameters: AddUserToRecordTeamRequestParameters
  ) {
    super("AddUserToRecordTeam", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.AddUserToRecordTeam`;

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

  async parseResponse(response: Response): Promise<AddUserToRecordTeamResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return AddUserToRecordTeamResponse.fromResponse({});
    return AddUserToRecordTeamResponse.fromResponse(await response.json());
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
