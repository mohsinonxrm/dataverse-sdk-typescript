import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { Label } from "./types/index.js";

/**
 * Response from RetrieveLocLabels function
 */
export interface RetrieveLocLabelsResponse {
  Label: Label;
}

/**
 * RetrieveLocLabels function
 *
 * Unbound function
 */
export class RetrieveLocLabelsFunction implements Executable<RetrieveLocLabelsResponse> {
  constructor(
    public readonly entityMoniker: EntityReference,
    public readonly attributeName: string,
    public readonly includeUnpublished: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLocLabels`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.entityMoniker, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.attributeName !== undefined) {
      aliases.push(`AttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.attributeName, "Edm.String"));
    }
    if (this.includeUnpublished !== undefined) {
      aliases.push(`IncludeUnpublished=@p3`);
      params.append("@p3", formatParameterAlias(this.includeUnpublished, "Edm.Boolean"));
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

  async parseResponse(response: Response): Promise<RetrieveLocLabelsResponse> {
    const data = await response.json();
    return data as RetrieveLocLabelsResponse;
  }
}
