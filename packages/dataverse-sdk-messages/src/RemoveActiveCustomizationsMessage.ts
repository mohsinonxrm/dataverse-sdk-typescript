import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RemoveActiveCustomizations message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveActiveCustomizationsRequestParameters {
  SolutionComponentName: string;
  ComponentId: string;
}

/**
 * RemoveActiveCustomizations request message
 *
 * Web API Function: RemoveActiveCustomizations
 */
export class RemoveActiveCustomizationsRequest
  extends OrganizationRequest
  implements Executable<RemoveActiveCustomizationsResponse>
{
  declare readonly Parameters: Readonly<RemoveActiveCustomizationsRequestParameters>;

  constructor(parameters: RemoveActiveCustomizationsRequestParameters) {
    super("RemoveActiveCustomizations", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RemoveActiveCustomizations`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SolutionComponentName !== undefined) {
      aliases.push(`SolutionComponentName=@p1`);
      params.append(
        "@p1",
        formatParameterAlias(this.Parameters.SolutionComponentName, "Edm.String")
      );
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationsResponse> {
    // The body is the complex value, with its @odata.context
    return RemoveActiveCustomizationsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RemoveActiveCustomizations function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RemoveActiveCustomizationsResult {
  "@odata.context"?: string;
  Result: boolean;
}

/**
 * RemoveActiveCustomizations response message
 *
 * `result` is the value the RemoveActiveCustomizations function returns (see {@link RemoveActiveCustomizationsResult}).
 */
export class RemoveActiveCustomizationsResponse extends OrganizationResponse {
  constructor(public result: RemoveActiveCustomizationsResult) {
    super("RemoveActiveCustomizations");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RemoveActiveCustomizationsResponse {
    return new RemoveActiveCustomizationsResponse(data as RemoveActiveCustomizationsResult);
  }
}
