import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { InitializeUploadUsingSasResponse } from "./types/index.js";

/**
 * Response from the GetFileSasUrlForUpload function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetFileSasUrlForUploadResponse {
  "@odata.context"?: string;
  Result: InitializeUploadUsingSasResponse;
}

/**
 * Parameters of the GetFileSasUrlForUpload function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFileSasUrlForUploadFunctionParameters {
  Target: EntityReference;
  FileAttributeName: string;
  FileName: string;
}

/**
 * GetFileSasUrlForUpload function
 *
 * Unbound function
 */
export class GetFileSasUrlForUploadFunction implements Executable<GetFileSasUrlForUploadResponse> {
  constructor(public readonly parameters: GetFileSasUrlForUploadFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetFileSasUrlForUpload`;

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
    if (this.parameters.FileName !== undefined) {
      aliases.push(`FileName=@p3`);
      params.append("@p3", formatParameterAlias(this.parameters.FileName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<GetFileSasUrlForUploadResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as GetFileSasUrlForUploadResponse;
  }
}
