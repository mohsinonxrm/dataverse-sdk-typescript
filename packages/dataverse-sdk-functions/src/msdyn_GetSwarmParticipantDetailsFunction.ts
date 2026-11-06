import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from msdyn_GetSwarmParticipantDetails function
 */
export interface msdyn_GetSwarmParticipantDetailsResponse {
  msdyn_PersonaObject: string;
}

/**
 * Parameters of the msdyn_GetSwarmParticipantDetails function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSwarmParticipantDetailsFunctionParameters {
  msdyn_SwarmParticipantId: string;
}

/**
 * msdyn_GetSwarmParticipantDetails function
 *
 * Unbound function
 */
export class msdyn_GetSwarmParticipantDetailsFunction implements Executable<msdyn_GetSwarmParticipantDetailsResponse> {
  constructor(public readonly parameters: msdyn_GetSwarmParticipantDetailsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_GetSwarmParticipantDetails`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.msdyn_SwarmParticipantId !== undefined) {
      aliases.push(`msdyn_SwarmParticipantId=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.msdyn_SwarmParticipantId, "Edm.String")
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSwarmParticipantDetailsResponse;
  }
}
