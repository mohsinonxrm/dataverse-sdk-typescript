import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityRecordCountCollection } from "./types/index.js";

/**
 * Parameters of the RetrieveTotalRecordCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveTotalRecordCountRequestParameters {
  EntityNames: string[];
}

/**
 * RetrieveTotalRecordCount request message
 *
 * Web API Function: RetrieveTotalRecordCount
 */
export class RetrieveTotalRecordCountRequest
  extends OrganizationRequest
  implements Executable<RetrieveTotalRecordCountResponse>
{
  declare readonly Parameters: Readonly<RetrieveTotalRecordCountRequestParameters>;

  constructor(parameters: RetrieveTotalRecordCountRequestParameters) {
    super("RetrieveTotalRecordCount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveTotalRecordCount`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityNames !== undefined) {
      aliases.push(`EntityNames=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.EntityNames, "Collection(Edm.String)", "Collection")
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

  async parseResponse(response: Response): Promise<RetrieveTotalRecordCountResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveTotalRecordCountResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveTotalRecordCount function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveTotalRecordCountResult {
  "@odata.context"?: string;
  EntityRecordCountCollection: EntityRecordCountCollection;
}

/**
 * RetrieveTotalRecordCount response message
 *
 * `result` is the value the RetrieveTotalRecordCount function returns (see {@link RetrieveTotalRecordCountResult}).
 */
export class RetrieveTotalRecordCountResponse extends OrganizationResponse {
  constructor(public result: RetrieveTotalRecordCountResult) {
    super("RetrieveTotalRecordCount");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveTotalRecordCountResponse {
    return new RetrieveTotalRecordCountResponse(data as RetrieveTotalRecordCountResult);
  }
}
