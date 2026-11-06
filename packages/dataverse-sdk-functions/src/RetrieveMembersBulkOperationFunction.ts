import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";

/**
 * Response from RetrieveMembersBulkOperation function
 */
export interface RetrieveMembersBulkOperationResponse {
  value: EntityReference[];
}

/**
 * RetrieveMembersBulkOperation function
 *
 * Bound function
 * Binding parameter: entity (mscrm.bulkoperation)
 */
export class RetrieveMembersBulkOperationFunction implements Executable<RetrieveMembersBulkOperationResponse> {
  constructor(
    public readonly bulkoperationId: string,
    public readonly bulkOperationSource: number,
    public readonly entitySource: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/bulkoperations(${this.bulkoperationId})/Microsoft.Dynamics.CRM.RetrieveMembersBulkOperation`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.bulkOperationSource !== undefined) {
      aliases.push(`BulkOperationSource=@p1`);
      params.append("@p1", formatParameterAlias(this.bulkOperationSource, "Edm.Int32"));
    }
    if (this.entitySource !== undefined) {
      aliases.push(`EntitySource=@p2`);
      params.append("@p2", formatParameterAlias(this.entitySource, "Edm.Int32"));
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
    const data = await response.json();
    return data as RetrieveMembersBulkOperationResponse;
  }
}
