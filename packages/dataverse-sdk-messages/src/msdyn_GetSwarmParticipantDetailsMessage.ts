import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the msdyn_GetSwarmParticipantDetails message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmParticipantDetailsRequestParameters {
  msdyn_SwarmParticipantId: string;
}

/**
 * msdyn_GetSwarmParticipantDetails request message
 *
 * Web API Function: msdyn_GetSwarmParticipantDetails
 */
export class msdyn_GetSwarmParticipantDetailsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSwarmParticipantDetailsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetSwarmParticipantDetailsRequestParameters>;

  constructor(parameters: msdyn_GetSwarmParticipantDetailsRequestParameters) {
    super("msdyn_GetSwarmParticipantDetails", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetSwarmParticipantDetails`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.msdyn_SwarmParticipantId !== undefined) {
      aliases.push(`msdyn_SwarmParticipantId=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.msdyn_SwarmParticipantId, "Edm.String")
      );
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSwarmParticipantDetailsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetSwarmParticipantDetailsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetSwarmParticipantDetails function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetSwarmParticipantDetailsResult {
  "@odata.context"?: string;
  msdyn_PersonaObject: string;
}

/**
 * msdyn_GetSwarmParticipantDetails response message
 *
 * `result` is the value the msdyn_GetSwarmParticipantDetails function returns (see {@link msdyn_GetSwarmParticipantDetailsResult}).
 */
export class msdyn_GetSwarmParticipantDetailsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSwarmParticipantDetailsResult) {
    super("msdyn_GetSwarmParticipantDetails");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetSwarmParticipantDetailsResponse {
    return new msdyn_GetSwarmParticipantDetailsResponse(
      data as msdyn_GetSwarmParticipantDetailsResult
    );
  }
}
