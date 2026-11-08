import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveMembersBulkOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMembersBulkOperationRequestParameters {
  BulkOperationSource: number;
  EntitySource: number;
}

/**
 * RetrieveMembersBulkOperation request message
 *
 * Web API Function: RetrieveMembersBulkOperation
 *
 * The first argument is the id of the bulkoperation record to call it on.
 */
export class RetrieveMembersBulkOperationRequest
  extends OrganizationRequest
  implements Executable<RetrieveMembersBulkOperationResponse>
{
  declare readonly Parameters: Readonly<RetrieveMembersBulkOperationRequestParameters>;

  constructor(
    public bulkoperationId: string,
    parameters: RetrieveMembersBulkOperationRequestParameters
  ) {
    super("RetrieveMembersBulkOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/bulkoperations(${odataLiteral.guid(this.bulkoperationId)})/Microsoft.Dynamics.CRM.RetrieveMembersBulkOperation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.BulkOperationSource !== undefined) {
      aliases.push(`BulkOperationSource=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.BulkOperationSource, "Edm.Int32"));
    }
    if (this.Parameters.EntitySource !== undefined) {
      aliases.push(`EntitySource=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.EntitySource, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveMembersBulkOperationResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveMembersBulkOperationResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveMembersBulkOperationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMembersBulkOperation function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveMembersBulkOperationResult = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * RetrieveMembersBulkOperation response message
 *
 * `result` is the value the RetrieveMembersBulkOperation function returns (see {@link RetrieveMembersBulkOperationResult}).
 */
export class RetrieveMembersBulkOperationResponse extends OrganizationResponse {
  constructor(public result: RetrieveMembersBulkOperationResult) {
    super("RetrieveMembersBulkOperation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMembersBulkOperationResponse {
    return new RetrieveMembersBulkOperationResponse(
      data === undefined ? [] : (data as { value: RetrieveMembersBulkOperationResult }).value
    );
  }
}
