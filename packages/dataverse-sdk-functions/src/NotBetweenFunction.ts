import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from NotBetween function
 */
export interface NotBetweenResponse {
  value: boolean;
}

/**
 * NotBetween function
 *
 * Unbound function
 */
export class NotBetweenFunction implements Executable<NotBetweenResponse> {
  constructor(
    public readonly propertyName: string,
    public readonly propertyValues: string[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/NotBetween`;

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
    if (this.propertyValues !== undefined) {
      aliases.push(`PropertyValues=@p2`);
      params.append("@p2", JSON.stringify(this.propertyValues));
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

  async parseResponse(response: Response): Promise<NotBetweenResponse> {
    const data = await response.json();
    return data as NotBetweenResponse;
  }
}
