import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the GetComponentManagedIdentityFIC message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetComponentManagedIdentityFICRequestParameters {
  ComponentName: string;
  ComponentId: string;
}

/**
 * GetComponentManagedIdentityFIC request message
 *
 * Web API Function: GetComponentManagedIdentityFIC
 */
export class GetComponentManagedIdentityFICRequest
  extends OrganizationRequest
  implements Executable<GetComponentManagedIdentityFICResponse>
{
  declare readonly Parameters: Readonly<GetComponentManagedIdentityFICRequestParameters>;

  constructor(parameters: GetComponentManagedIdentityFICRequestParameters) {
    super("GetComponentManagedIdentityFIC", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/GetComponentManagedIdentityFIC`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ComponentName !== undefined) {
      aliases.push(`ComponentName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ComponentName, "Edm.String"));
    }
    if (this.Parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ComponentId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<GetComponentManagedIdentityFICResponse> {
    // The body is the complex value, with its @odata.context
    return GetComponentManagedIdentityFICResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetComponentManagedIdentityFIC function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface GetComponentManagedIdentityFICResult {
  "@odata.context"?: string;
  FICSubject: string;
}

/**
 * GetComponentManagedIdentityFIC response message
 *
 * `result` is the value the GetComponentManagedIdentityFIC function returns (see {@link GetComponentManagedIdentityFICResult}).
 */
export class GetComponentManagedIdentityFICResponse extends OrganizationResponse {
  constructor(public result: GetComponentManagedIdentityFICResult) {
    super("GetComponentManagedIdentityFIC");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetComponentManagedIdentityFICResponse {
    return new GetComponentManagedIdentityFICResponse(data as GetComponentManagedIdentityFICResult);
  }
}
