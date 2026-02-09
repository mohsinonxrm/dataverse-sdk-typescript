import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from EqualUserOrUserTeams function
 */
export interface EqualUserOrUserTeamsResponse {
  value: boolean;
}

/**
 * EqualUserOrUserTeams function
 *
 * Unbound function
 */
export class EqualUserOrUserTeamsFunction implements Executable<EqualUserOrUserTeamsResponse> {
  constructor(public readonly propertyName: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/EqualUserOrUserTeams`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.propertyName !== undefined) {
      aliases.push(`PropertyName=@p1`);
      params.append(
        "@p1",
        typeof this.propertyName === "string" ? `'${this.propertyName}'` : String(this.propertyName)
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

  async parseResponse(response: Response): Promise<EqualUserOrUserTeamsResponse> {
    const data = await response.json();
    return data as EqualUserOrUserTeamsResponse;
  }
}
