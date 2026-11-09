import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { processstage } from "./types/index.js";

/**
 * Parameters of the RetrieveActivePath message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveActivePathRequestParameters {
  ProcessInstanceId: string;
}

/**
 * RetrieveActivePath request message
 *
 * Web API Function: RetrieveActivePath
 */
export class RetrieveActivePathRequest
  extends OrganizationRequest
  implements Executable<RetrieveActivePathResponse>
{
  declare readonly Parameters: Readonly<RetrieveActivePathRequestParameters>;

  constructor(parameters: RetrieveActivePathRequestParameters) {
    super("RetrieveActivePath", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveActivePath`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ProcessInstanceId !== undefined) {
      aliases.push(`ProcessInstanceId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ProcessInstanceId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<RetrieveActivePathResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveActivePathResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveActivePathResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveActivePath function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveActivePathResult = Array<
  processstage & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveActivePath response message
 *
 * `result` is the value the RetrieveActivePath function returns (see {@link RetrieveActivePathResult}).
 */
export class RetrieveActivePathResponse extends OrganizationResponse {
  constructor(public result: RetrieveActivePathResult) {
    super("RetrieveActivePath");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveActivePathResponse {
    return new RetrieveActivePathResponse(
      data === undefined ? [] : (data as { value: RetrieveActivePathResult }).value
    );
  }
}
