import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the IsComponentCustomizable message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface IsComponentCustomizableRequestParameters {
  ComponentId: string;
  ComponentType: number;
}

/**
 * IsComponentCustomizable request message
 *
 * Web API Function: IsComponentCustomizable
 */
export class IsComponentCustomizableRequest
  extends OrganizationRequest
  implements Executable<IsComponentCustomizableResponse>
{
  declare readonly Parameters: Readonly<IsComponentCustomizableRequestParameters>;

  constructor(parameters: IsComponentCustomizableRequestParameters) {
    super("IsComponentCustomizable", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/IsComponentCustomizable`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.ComponentId !== undefined) {
      aliases.push(`ComponentId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.ComponentId, "Edm.Guid"));
    }
    if (this.Parameters.ComponentType !== undefined) {
      aliases.push(`ComponentType=@p2`);
      params.append("@p2", formatParameterAlias(this.Parameters.ComponentType, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<IsComponentCustomizableResponse> {
    // The body is the complex value, with its @odata.context
    return IsComponentCustomizableResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the IsComponentCustomizable function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface IsComponentCustomizableResult {
  "@odata.context"?: string;
  IsComponentCustomizable: boolean;
}

/**
 * IsComponentCustomizable response message
 *
 * `result` is the value the IsComponentCustomizable function returns (see {@link IsComponentCustomizableResult}).
 */
export class IsComponentCustomizableResponse extends OrganizationResponse {
  constructor(public result: IsComponentCustomizableResult) {
    super("IsComponentCustomizable");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): IsComponentCustomizableResponse {
    return new IsComponentCustomizableResponse(data as IsComponentCustomizableResult);
  }
}
