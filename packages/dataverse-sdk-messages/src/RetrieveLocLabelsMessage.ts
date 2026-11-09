import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { Label } from "./types/index.js";

/**
 * Parameters of the RetrieveLocLabels message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveLocLabelsRequestParameters {
  EntityMoniker: EntityReference;
  AttributeName: string;
  IncludeUnpublished: boolean;
}

/**
 * RetrieveLocLabels request message
 *
 * Web API Function: RetrieveLocLabels
 */
export class RetrieveLocLabelsRequest
  extends OrganizationRequest
  implements Executable<RetrieveLocLabelsResponse>
{
  declare readonly Parameters: Readonly<RetrieveLocLabelsRequestParameters>;

  constructor(parameters: RetrieveLocLabelsRequestParameters) {
    super("RetrieveLocLabels", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveLocLabels`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityMoniker !== undefined) {
      aliases.push(`EntityMoniker=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.EntityMoniker, "mscrm.crmbaseentity", "EntityType")
      );
    }
    if (this.Parameters.AttributeName !== undefined) {
      aliases.push(`AttributeName=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.AttributeName, "Edm.String"));
    }
    if (this.Parameters.IncludeUnpublished !== undefined) {
      aliases.push(`IncludeUnpublished=@p3`);
      params.append("@p3", formatParameterAlias(this.Parameters.IncludeUnpublished, "Edm.Boolean"));
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
    // The body is the complex value, with its @odata.context
    return RetrieveLocLabelsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveLocLabels function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveLocLabelsResult {
  "@odata.context"?: string;
  Label: Label;
}

/**
 * RetrieveLocLabels response message
 *
 * `result` is the value the RetrieveLocLabels function returns (see {@link RetrieveLocLabelsResult}).
 */
export class RetrieveLocLabelsResponse extends OrganizationResponse {
  constructor(public result: RetrieveLocLabelsResult) {
    super("RetrieveLocLabels");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveLocLabelsResponse {
    return new RetrieveLocLabelsResponse(data as RetrieveLocLabelsResult);
  }
}
