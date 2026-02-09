import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_getnotificationurl function
 */
export interface msdyn_getnotificationurlResponse {
  notificationurl: string;
  scopes: string[];
  tenant: string;
}

/**
 * msdyn_getnotificationurl function
 *
 * Unbound function
 */
export class msdyn_getnotificationurlFunction implements Executable<msdyn_getnotificationurlResponse> {
  constructor(
    public readonly contactpoint: string,
    public readonly channeldefinitionid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_getnotificationurl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.contactpoint !== undefined) {
      aliases.push(`contactpoint=@p1`);
      params.append(
        "@p1",
        typeof this.contactpoint === "string" ? `'${this.contactpoint}'` : String(this.contactpoint)
      );
    }
    if (this.channeldefinitionid !== undefined) {
      aliases.push(`channeldefinitionid=@p2`);
      params.append(
        "@p2",
        typeof this.channeldefinitionid === "string"
          ? `'${this.channeldefinitionid}'`
          : String(this.channeldefinitionid)
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

  async parseResponse(response: Response): Promise<msdyn_getnotificationurlResponse> {
    const data = await response.json();
    return data as msdyn_getnotificationurlResponse;
  }
}
