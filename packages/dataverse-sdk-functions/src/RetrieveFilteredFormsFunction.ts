import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { systemform, systemuser } from "./types/index.js";

/**
 * Response from RetrieveFilteredForms function
 */
export interface RetrieveFilteredFormsResponse {
  value: systemform[];
}

/**
 * RetrieveFilteredForms function
 *
 * Bound function
 * Binding parameter: entityset (Collection(mscrm.systemform))
 */
export class RetrieveFilteredFormsFunction implements Executable<RetrieveFilteredFormsResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly formType: number,
    public readonly user: systemuser
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.entityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append("@p1", formatAliasValue(this.entityLogicalName));
    }
    if (this.formType !== undefined) {
      aliases.push(`FormType=@p2`);
      params.append("@p2", formatAliasValue(this.formType));
    }
    if (this.user !== undefined) {
      aliases.push(`User=@p3`);
      params.append("@p3", JSON.stringify(this.user));
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

  async parseResponse(response: Response): Promise<RetrieveFilteredFormsResponse> {
    const data = await response.json();
    return data as RetrieveFilteredFormsResponse;
  }
}
