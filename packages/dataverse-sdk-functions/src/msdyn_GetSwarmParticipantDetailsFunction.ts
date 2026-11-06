import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_GetSwarmParticipantDetails function
 */
export interface msdyn_GetSwarmParticipantDetailsResponse {
  msdyn_PersonaObject: string;
}

/**
 * msdyn_GetSwarmParticipantDetails function
 *
 * Unbound function
 */
export class msdyn_GetSwarmParticipantDetailsFunction implements Executable<msdyn_GetSwarmParticipantDetailsResponse> {
  constructor(public readonly msdyn_SwarmParticipantId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetSwarmParticipantDetails`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.msdyn_SwarmParticipantId !== undefined) {
      aliases.push(`msdyn_SwarmParticipantId=@p1`);
      params.append("@p1", formatParameterAlias(this.msdyn_SwarmParticipantId, "Edm.String"));
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
    const data = await response.json();
    return data as msdyn_GetSwarmParticipantDetailsResponse;
  }
}
