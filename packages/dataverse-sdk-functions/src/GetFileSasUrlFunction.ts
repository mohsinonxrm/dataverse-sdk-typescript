import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { FileSasUrlResponse } from "./types/index.js";

/**
 * Response from GetFileSasUrl function
 */
export interface GetFileSasUrlResponse {
  Result: FileSasUrlResponse;
}

/**
 * GetFileSasUrl function
 *
 * Unbound function
 */
export class GetFileSasUrlFunction implements Executable<GetFileSasUrlResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly fileAttributeName: string,
    public readonly dataSource?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetFileSasUrl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", formatParameterAlias(this.target, "mscrm.crmbaseentity", "EntityType"));
    }
    if (this.fileAttributeName !== undefined) {
      aliases.push(`FileAttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.fileAttributeName, "Edm.String"));
    }
    if (this.dataSource !== undefined) {
      aliases.push(`DataSource=@p3`);
      params.append("@p3", formatParameterAlias(this.dataSource, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetFileSasUrlResponse> {
    const data = await response.json();
    return data as GetFileSasUrlResponse;
  }
}
