import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveMaskedAttributesForEntity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMaskedAttributesForEntityRequestParameters {
  EntityLogicalName: string;
}

/**
 * RetrieveMaskedAttributesForEntity request message
 *
 * Web API Function: RetrieveMaskedAttributesForEntity
 */
export class RetrieveMaskedAttributesForEntityRequest
  extends OrganizationRequest
  implements Executable<RetrieveMaskedAttributesForEntityResponse>
{
  declare readonly Parameters: Readonly<RetrieveMaskedAttributesForEntityRequestParameters>;

  constructor(parameters: RetrieveMaskedAttributesForEntityRequestParameters) {
    super("RetrieveMaskedAttributesForEntity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMaskedAttributesForEntity`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.EntityLogicalName !== undefined) {
      aliases.push(`EntityLogicalName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.EntityLogicalName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveMaskedAttributesForEntityResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveMaskedAttributesForEntityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMaskedAttributesForEntity function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMaskedAttributesForEntityResult {
  "@odata.context"?: string;
  AttributeLogicalNames: string[];
}

/**
 * RetrieveMaskedAttributesForEntity response message
 *
 * `result` is the value the RetrieveMaskedAttributesForEntity function returns (see {@link RetrieveMaskedAttributesForEntityResult}).
 */
export class RetrieveMaskedAttributesForEntityResponse extends OrganizationResponse {
  constructor(public result: RetrieveMaskedAttributesForEntityResult) {
    super("RetrieveMaskedAttributesForEntity");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMaskedAttributesForEntityResponse {
    return new RetrieveMaskedAttributesForEntityResponse(
      data as RetrieveMaskedAttributesForEntityResult
    );
  }
}
