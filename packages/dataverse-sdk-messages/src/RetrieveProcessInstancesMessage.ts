import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveProcessInstances message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveProcessInstancesRequestParameters {
  EntityId: string;
  EntityLogicalName: string;
}

/**
 * RetrieveProcessInstances request message
 *
 * Web API Function: RetrieveProcessInstances
 */
export class RetrieveProcessInstancesRequest
  extends OrganizationRequest
  implements Executable<RetrieveProcessInstancesResponse>
{
  declare readonly Parameters: Readonly<RetrieveProcessInstancesRequestParameters>;

  constructor(parameters: RetrieveProcessInstancesRequestParameters) {
    super("RetrieveProcessInstances", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProcessInstances`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityId !== undefined) {
      aliases.push(`EntityId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.EntityId, "Edm.Guid"));
    }
    if (this.Parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.EntityLogicalName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveProcessInstancesResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveProcessInstancesResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveProcessInstancesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProcessInstances function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveProcessInstancesResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveProcessInstances response message
 *
 * `result` is the value the RetrieveProcessInstances function returns (see {@link RetrieveProcessInstancesResult}).
 */
export class RetrieveProcessInstancesResponse extends OrganizationResponse {
  constructor(public result: RetrieveProcessInstancesResult) {
    super("RetrieveProcessInstances");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProcessInstancesResponse {
    return new RetrieveProcessInstancesResponse(
      data === undefined ? [] : (data as { value: RetrieveProcessInstancesResult }).value
    );
  }
}
