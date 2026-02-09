import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { getEntitySetNameFromReference } from "./types/EntityReference.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from RetrieveSharedPrincipalsAndAccess function
 */
export interface RetrieveSharedPrincipalsAndAccessResponse {
  PrincipalAccesses: PrincipalAccess[];
}

/**
 * RetrieveSharedPrincipalsAndAccess function
 *
 * Unbound function
 */
export class RetrieveSharedPrincipalsAndAccessFunction implements Executable<RetrieveSharedPrincipalsAndAccessResponse> {
  constructor(public readonly target: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedPrincipalsAndAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        JSON.stringify({
          "@odata.id": `${getEntitySetNameFromReference(this.target)}(${this.target.id})`,
        })
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

  async parseResponse(response: Response): Promise<RetrieveSharedPrincipalsAndAccessResponse> {
    const data = await response.json();
    return data as RetrieveSharedPrincipalsAndAccessResponse;
  }
}
