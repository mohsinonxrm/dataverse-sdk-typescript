import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type { AuditDetailCollection, PagingInfo } from "./types/index.js";

/**
 * Response from the RetrieveAttributeChangeHistory function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveAttributeChangeHistoryResponse {
  "@odata.context"?: string;
  AuditDetailCollection: AuditDetailCollection;
}

/**
 * Parameters of the RetrieveAttributeChangeHistory function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveAttributeChangeHistoryFunctionParameters {
  Target: EntityReference;
  AttributeLogicalName: string;
  PagingInfo?: PagingInfo;
}

/**
 * RetrieveAttributeChangeHistory function
 *
 * Unbound function
 */
export class RetrieveAttributeChangeHistoryFunction implements Executable<RetrieveAttributeChangeHistoryResponse> {
  constructor(public readonly parameters: RetrieveAttributeChangeHistoryFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveAttributeChangeHistory`;

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
    if (this.parameters.AttributeLogicalName !== undefined) {
      aliases.push(`AttributeLogicalName=@p2`);
      params.append(
        "@p2",
        formatParameterAlias(this.parameters.AttributeLogicalName, "Edm.String")
      );
    }
    if (this.parameters.PagingInfo !== undefined) {
      aliases.push(`PagingInfo=@p3`);
      params.append("@p3", JSON.stringify(this.parameters.PagingInfo));
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

  async parseResponse(response: Response): Promise<RetrieveAttributeChangeHistoryResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveAttributeChangeHistoryResponse;
  }
}
