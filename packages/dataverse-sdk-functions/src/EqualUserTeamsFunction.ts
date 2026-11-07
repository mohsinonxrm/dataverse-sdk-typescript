import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the EqualUserTeams function.
 *
 * The value, read from the `value` of the response body.
 */
export type EqualUserTeamsResponse = boolean;

/**
 * Parameters of the EqualUserTeams function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface EqualUserTeamsFunctionParameters {
  PropertyName: string;
}

/**
 * EqualUserTeams function
 *
 * Unbound function
 */
export class EqualUserTeamsFunction implements Executable<EqualUserTeamsResponse> {
  constructor(public readonly parameters: EqualUserTeamsFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.PropertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.PropertyName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<EqualUserTeamsResponse> {
    // A primitive comes wrapped: { "@odata.context": "…", "value": … }
    return ((await response.json()) as { value: EqualUserTeamsResponse }).value;
  }
}
