import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RetrieveAccessOrigin function
 */
export interface RetrieveAccessOriginResponse {
  Response: string;
}

/**
 * RetrieveAccessOrigin function
 *
 * Unbound function
 */
export class RetrieveAccessOriginFunction implements Executable<RetrieveAccessOriginResponse> {
  constructor(
    public readonly objectId: string,
    public readonly logicalName: string,
    public readonly principalId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAccessOrigin`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.objectId !== undefined) {
      aliases.push(`ObjectId=@p1`);
      params.append(
        "@p1",
        typeof this.objectId === "string" ? `'${this.objectId}'` : String(this.objectId)
      );
    }
    if (this.logicalName !== undefined) {
      aliases.push(`LogicalName=@p2`);
      params.append(
        "@p2",
        typeof this.logicalName === "string" ? `'${this.logicalName}'` : String(this.logicalName)
      );
    }
    if (this.principalId !== undefined) {
      aliases.push(`PrincipalId=@p3`);
      params.append(
        "@p3",
        typeof this.principalId === "string" ? `'${this.principalId}'` : String(this.principalId)
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

  async parseResponse(response: Response): Promise<RetrieveAccessOriginResponse> {
    const data = await response.json();
    return data as RetrieveAccessOriginResponse;
  }
}
