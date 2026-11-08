import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveAppComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAppComponentsRequestParameters {
  AppModuleId: string;
}

/**
 * RetrieveAppComponents request message
 *
 * Web API Function: RetrieveAppComponents
 */
export class RetrieveAppComponentsRequest
  extends OrganizationRequest
  implements Executable<RetrieveAppComponentsResponse>
{
  declare readonly Parameters: Readonly<RetrieveAppComponentsRequestParameters>;

  constructor(parameters: RetrieveAppComponentsRequestParameters) {
    super("RetrieveAppComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAppComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.AppModuleId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveAppComponentsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveAppComponentsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveAppComponentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveAppComponents function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveAppComponentsResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveAppComponents response message
 *
 * `result` is the value the RetrieveAppComponents function returns (see {@link RetrieveAppComponentsResult}).
 */
export class RetrieveAppComponentsResponse extends OrganizationResponse {
  constructor(public result: RetrieveAppComponentsResult) {
    super("RetrieveAppComponents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveAppComponentsResponse {
    return new RetrieveAppComponentsResponse(
      data === undefined ? [] : (data as { value: RetrieveAppComponentsResult }).value
    );
  }
}
