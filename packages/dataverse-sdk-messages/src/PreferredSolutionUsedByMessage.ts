import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { PreferredSolutionDetails } from "./types/index.js";

/**
 * Parameters of the PreferredSolutionUsedBy message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PreferredSolutionUsedByRequestParameters {
  SolutionId: string;
}

/**
 * PreferredSolutionUsedBy request message
 *
 * Web API Function: PreferredSolutionUsedBy
 */
export class PreferredSolutionUsedByRequest
  extends OrganizationRequest
  implements Executable<PreferredSolutionUsedByResponse>
{
  declare readonly Parameters: Readonly<PreferredSolutionUsedByRequestParameters>;

  constructor(parameters: PreferredSolutionUsedByRequestParameters) {
    super("PreferredSolutionUsedBy", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/PreferredSolutionUsedBy`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SolutionId !== undefined) {
      aliases.push(`SolutionId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.SolutionId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<PreferredSolutionUsedByResponse> {
    // The body is the complex value, with its @odata.context
    return PreferredSolutionUsedByResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PreferredSolutionUsedBy function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PreferredSolutionUsedByResult {
  "@odata.context"?: string;
  NumberOfAssociatedUsers: number;
  PreferredSolutionDetails: PreferredSolutionDetails;
}

/**
 * PreferredSolutionUsedBy response message
 *
 * `result` is the value the PreferredSolutionUsedBy function returns (see {@link PreferredSolutionUsedByResult}).
 */
export class PreferredSolutionUsedByResponse extends OrganizationResponse {
  constructor(public result: PreferredSolutionUsedByResult) {
    super("PreferredSolutionUsedBy");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PreferredSolutionUsedByResponse {
    return new PreferredSolutionUsedByResponse(data as PreferredSolutionUsedByResult);
  }
}
