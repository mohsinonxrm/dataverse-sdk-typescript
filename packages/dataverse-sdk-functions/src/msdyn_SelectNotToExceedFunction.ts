import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_nottoexceed } from "./types/index.js";

/**
 * Response from msdyn_SelectNotToExceed function
 */
export interface msdyn_SelectNotToExceedResponse {
  value: msdyn_nottoexceed;
}

/**
 * msdyn_SelectNotToExceed function
 *
 * Unbound function
 */
export class msdyn_SelectNotToExceedFunction implements Executable<msdyn_SelectNotToExceedResponse> {
  constructor(
    public readonly msdyn_NTEType: number,
    public readonly msdyn_SelectNotToExceedFilters: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_SelectNotToExceed`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.msdyn_NTEType !== undefined) {
      aliases.push(`msdyn_NTEType=@p1`);
      params.append(
        "@p1",
        typeof this.msdyn_NTEType === "string"
          ? `'${this.msdyn_NTEType}'`
          : String(this.msdyn_NTEType)
      );
    }
    if (this.msdyn_SelectNotToExceedFilters !== undefined) {
      aliases.push(`msdyn_SelectNotToExceedFilters=@p2`);
      params.append(
        "@p2",
        typeof this.msdyn_SelectNotToExceedFilters === "string"
          ? `'${this.msdyn_SelectNotToExceedFilters}'`
          : String(this.msdyn_SelectNotToExceedFilters)
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

  async parseResponse(response: Response): Promise<msdyn_SelectNotToExceedResponse> {
    const data = await response.json();
    return data as msdyn_SelectNotToExceedResponse;
  }
}
