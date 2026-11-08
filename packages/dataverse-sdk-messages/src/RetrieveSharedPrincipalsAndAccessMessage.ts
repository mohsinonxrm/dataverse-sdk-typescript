import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PrincipalAccess } from "./types/index.js";

/**
 * Parameters of the RetrieveSharedPrincipalsAndAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveSharedPrincipalsAndAccessRequestParameters {
  Target: EntityReference;
}

/**
 * RetrieveSharedPrincipalsAndAccess request message
 *
 * Web API Function: RetrieveSharedPrincipalsAndAccess
 */
export class RetrieveSharedPrincipalsAndAccessRequest
  extends OrganizationRequest
  implements Executable<RetrieveSharedPrincipalsAndAccessResponse>
{
  declare readonly Parameters: Readonly<RetrieveSharedPrincipalsAndAccessRequestParameters>;

  constructor(parameters: RetrieveSharedPrincipalsAndAccessRequestParameters) {
    super("RetrieveSharedPrincipalsAndAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveSharedPrincipalsAndAccess`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.Target, "mscrm.crmbaseentity", "EntityType")
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
    return RetrieveSharedPrincipalsAndAccessResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveSharedPrincipalsAndAccess function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveSharedPrincipalsAndAccessResult {
  "@odata.context"?: string;
  PrincipalAccesses: PrincipalAccess[];
}

/**
 * RetrieveSharedPrincipalsAndAccess response message
 *
 * `result` is the value the RetrieveSharedPrincipalsAndAccess function returns (see {@link RetrieveSharedPrincipalsAndAccessResult}).
 */
export class RetrieveSharedPrincipalsAndAccessResponse extends OrganizationResponse {
  constructor(public result: RetrieveSharedPrincipalsAndAccessResult) {
    super("RetrieveSharedPrincipalsAndAccess");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveSharedPrincipalsAndAccessResponse {
    return new RetrieveSharedPrincipalsAndAccessResponse(
      data as RetrieveSharedPrincipalsAndAccessResult
    );
  }
}
