import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveMembersBulkOperation function
 */
export interface RetrieveMembersBulkOperationResponse {
  value: EntityReference[];
}

/**
 * Parameters of the RetrieveMembersBulkOperation function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMembersBulkOperationFunctionParameters {
  BulkOperationSource: number;
  EntitySource: number;
}

/**
 * RetrieveMembersBulkOperation function
 *
 * Bound function
 * Binding parameter: entity (mscrm.bulkoperation)
 *
 * The first argument is the id of the bulkoperation record to call it on.
 */
export class RetrieveMembersBulkOperationFunction implements Executable<RetrieveMembersBulkOperationResponse> {
  constructor(
    public readonly bulkoperationId: string,
    public readonly parameters: RetrieveMembersBulkOperationFunctionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/bulkoperations(${this.bulkoperationId})/Microsoft.Dynamics.CRM.RetrieveMembersBulkOperation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.BulkOperationSource !== undefined) {
      aliases.push(`BulkOperationSource=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.BulkOperationSource, "Edm.Int32"));
    }
    if (this.parameters.EntitySource !== undefined) {
      aliases.push(`EntitySource=@p2`);
      params.append("@p2", formatParameterAlias(this.parameters.EntitySource, "Edm.Int32"));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveMembersBulkOperationResponse;
    return (await response.json()) as RetrieveMembersBulkOperationResponse;
  }
}
