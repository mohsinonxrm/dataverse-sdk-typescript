import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetValidReferencedEntities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetValidReferencedEntitiesRequestParameters {
  ReferencingEntityName?: string;
}

/**
 * GetValidReferencedEntities request message
 *
 * Web API Function: GetValidReferencedEntities
 */
export class GetValidReferencedEntitiesRequest
  extends OrganizationRequest
  implements Executable<GetValidReferencedEntitiesResponse>
{
  declare readonly Parameters: Readonly<GetValidReferencedEntitiesRequestParameters>;

  constructor(parameters: GetValidReferencedEntitiesRequestParameters = {}) {
    super("GetValidReferencedEntities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetValidReferencedEntities`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ReferencingEntityName !== undefined) {
      aliases.push(`ReferencingEntityName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.ReferencingEntityName, "Edm.String")
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

  async parseResponse(response: Response): Promise<GetValidReferencedEntitiesResponse> {
    // The body is the complex value, with its @odata.context
    return GetValidReferencedEntitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetValidReferencedEntities function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetValidReferencedEntitiesResult {
  "@odata.context"?: string;
  EntityNames: string[];
}

/**
 * GetValidReferencedEntities response message
 *
 * `result` is the value the GetValidReferencedEntities function returns (see {@link GetValidReferencedEntitiesResult}).
 */
export class GetValidReferencedEntitiesResponse extends OrganizationResponse {
  constructor(public result: GetValidReferencedEntitiesResult) {
    super("GetValidReferencedEntities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetValidReferencedEntitiesResponse {
    return new GetValidReferencedEntitiesResponse(data as GetValidReferencedEntitiesResult);
  }
}
