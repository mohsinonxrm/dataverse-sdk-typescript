import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { FileSasUrlResponse } from "./types/index.js";

/**
 * Parameters of the GetFileSasUrl message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetFileSasUrlRequestParameters {
  Target: EntityReference;
  FileAttributeName: string;
  DataSource?: string;
}

/**
 * GetFileSasUrl request message
 *
 * Web API Function: GetFileSasUrl
 */
export class GetFileSasUrlRequest
  extends OrganizationRequest
  implements Executable<GetFileSasUrlResponse>
{
  declare readonly Parameters: Readonly<GetFileSasUrlRequestParameters>;

  constructor(parameters: GetFileSasUrlRequestParameters) {
    super("GetFileSasUrl", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetFileSasUrl`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.FileAttributeName !== undefined) {
      aliases.push(`FileAttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.FileAttributeName, "Edm.String"));
    }
    if (this.Parameters.DataSource !== undefined) {
      aliases.push(`DataSource=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.DataSource, "Edm.String"));
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
    // The body is the complex value, with its @odata.context
    return GetFileSasUrlResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetFileSasUrl function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetFileSasUrlResult {
  "@odata.context"?: string;
  Result: FileSasUrlResponse;
}

/**
 * GetFileSasUrl response message
 *
 * `result` is the value the GetFileSasUrl function returns (see {@link GetFileSasUrlResult}).
 */
export class GetFileSasUrlResponse extends OrganizationResponse {
  constructor(public result: GetFileSasUrlResult) {
    super("GetFileSasUrl");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetFileSasUrlResponse {
    return new GetFileSasUrlResponse(data as GetFileSasUrlResult);
  }
}
