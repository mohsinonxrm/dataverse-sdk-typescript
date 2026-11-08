import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetValidReferencingEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetValidReferencingEntitiesRequestParameters {
  ReferencedEntityName?: string;
}

/**
 * GetValidReferencingEntities request message
 *
 * Web API Function: GetValidReferencingEntities
 */
export class GetValidReferencingEntitiesRequest
  extends OrganizationRequest
  implements Executable<GetValidReferencingEntitiesResponse>
{
  declare readonly Parameters: Readonly<GetValidReferencingEntitiesRequestParameters>;

  constructor(parameters: GetValidReferencingEntitiesRequestParameters = {}) {
    super("GetValidReferencingEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencingEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ReferencedEntityName !== undefined) {
      aliases.push(`ReferencedEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.ReferencedEntityName, "Edm.String")
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

  async parseResponse(response: Response): Promise<GetValidReferencingEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return GetValidReferencingEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetValidReferencingEntities function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetValidReferencingEntitiesResult {
  "@odata.context"?: string;
  EntityNames: string[];
}

/**
 * GetValidReferencingEntities response message
 *
 * `result` is the value the GetValidReferencingEntities function returns (see {@link GetValidReferencingEntitiesResult}).
 */
export class GetValidReferencingEntitiesResponse extends OrganizationResponse {
  constructor(public result: GetValidReferencingEntitiesResult) {
    super("GetValidReferencingEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetValidReferencingEntitiesResponse {
    return new GetValidReferencingEntitiesResponse(data as GetValidReferencingEntitiesResult);
  }
}
