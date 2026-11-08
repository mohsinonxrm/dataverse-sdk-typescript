import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { MissingComponent } from "./types/index.js";

/**
 * Parameters of the RetrieveMissingComponents message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveMissingComponentsRequestParameters {
  CustomizationFile: string;
}

/**
 * RetrieveMissingComponents request message
 *
 * Web API Function: RetrieveMissingComponents
 */
export class RetrieveMissingComponentsRequest
  extends OrganizationRequest
  implements Executable<RetrieveMissingComponentsResponse>
{
  declare readonly Parameters: Readonly<RetrieveMissingComponentsRequestParameters>;

  constructor(parameters: RetrieveMissingComponentsRequestParameters) {
    super("RetrieveMissingComponents", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveMissingComponents`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.CustomizationFile !== undefined) {
      aliases.push(`CustomizationFile=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.CustomizationFile, "Edm.Binary"));
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

  async parseResponse(response: Response): Promise<RetrieveMissingComponentsResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveMissingComponentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveMissingComponents function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveMissingComponentsResult {
  "@odata.context"?: string;
  MissingComponents: MissingComponent[];
}

/**
 * RetrieveMissingComponents response message
 *
 * `result` is the value the RetrieveMissingComponents function returns (see {@link RetrieveMissingComponentsResult}).
 */
export class RetrieveMissingComponentsResponse extends OrganizationResponse {
  constructor(public result: RetrieveMissingComponentsResult) {
    super("RetrieveMissingComponents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveMissingComponentsResponse {
    return new RetrieveMissingComponentsResponse(data as RetrieveMissingComponentsResult);
  }
}
