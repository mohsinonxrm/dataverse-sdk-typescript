import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { systemform, systemuser } from "./types/index.js";

/**
 * Parameters of the RetrieveFilteredForms message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveFilteredFormsRequestParameters {
  EntityLogicalName: string;
  FormType: number;
  User: systemuser;
}

/**
 * RetrieveFilteredForms request message
 *
 * Web API Function: RetrieveFilteredForms
 */
export class RetrieveFilteredFormsRequest
  extends OrganizationRequest
  implements Executable<RetrieveFilteredFormsResponse>
{
  declare readonly Parameters: Readonly<RetrieveFilteredFormsRequestParameters>;

  constructor(parameters: RetrieveFilteredFormsRequestParameters) {
    super("RetrieveFilteredForms", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function (entity collection)
    let url = `${baseUrl}/systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.EntityLogicalName, "Edm.String"));
    }
    if (this.Parameters.FormType !== undefined) {
      aliases.push(`FormType=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.FormType, "Edm.Int32"));
    }
    if (this.Parameters.User !== undefined) {
      aliases.push(`User=@p3`);
      params.append(
        "@p3",
        formatParameterAlias(this.Parameters.User, "mscrm.systemuser", "EntityType")
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

  async parseResponse(response: Response): Promise<RetrieveFilteredFormsResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return RetrieveFilteredFormsResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveFilteredFormsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveFilteredForms function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveFilteredFormsResult = Array<
  systemform & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveFilteredForms response message
 *
 * `result` is the value the RetrieveFilteredForms function returns (see {@link RetrieveFilteredFormsResult}).
 */
export class RetrieveFilteredFormsResponse extends OrganizationResponse {
  constructor(public result: RetrieveFilteredFormsResult) {
    super("RetrieveFilteredForms");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveFilteredFormsResponse {
    return new RetrieveFilteredFormsResponse(
      data === undefined ? [] : (data as { value: RetrieveFilteredFormsResult }).value
    );
  }
}
