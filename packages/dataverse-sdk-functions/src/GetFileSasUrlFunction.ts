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
 * Parameters of the GetFileSasUrl function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFileSasUrlFunctionParameters {
  Target: EntityReference;
  FileAttributeName: string;
  DataSource?: string;
}

/**
 * GetFileSasUrl function
 *
 * Unbound function
 */
export class GetFileSasUrlFunction implements Executable<GetFileSasUrlResponse> {
  constructor(public readonly parameters: GetFileSasUrlFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetFileSasUrl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.parameters.FileAttributeName !== undefined) {
      aliases.push(`FileAttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.FileAttributeName, "Edm.String"));
    }
    if (this.parameters.DataSource !== undefined) {
      aliases.push(`DataSource=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.DataSource, "Edm.String"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GetFileSasUrlResponse;
    return (await response.json()) as GetFileSasUrlResponse;
  }
}
