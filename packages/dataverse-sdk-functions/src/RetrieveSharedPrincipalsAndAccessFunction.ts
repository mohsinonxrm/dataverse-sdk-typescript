import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Response from the RetrieveSharedPrincipalsAndAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveSharedPrincipalsAndAccessResponse {
  "@odata.context"?: string;
  PrincipalAccesses: PrincipalAccess[];
}

/**
 * Parameters of the RetrieveSharedPrincipalsAndAccess function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSharedPrincipalsAndAccessFunctionParameters {
  Target: EntityReference;
}

/**
 * RetrieveSharedPrincipalsAndAccess function
 *
 * Unbound function
 */
export class RetrieveSharedPrincipalsAndAccessFunction implements Executable<RetrieveSharedPrincipalsAndAccessResponse> {
  constructor(public readonly parameters: RetrieveSharedPrincipalsAndAccessFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedPrincipalsAndAccess`;

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as RetrieveSharedPrincipalsAndAccessResponse;
  }
}
