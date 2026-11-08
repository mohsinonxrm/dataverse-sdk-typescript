import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { dependency } from "./types/index.js";

/**
 * Parameters of the RetrieveDependenciesForUninstall message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveDependenciesForUninstallRequestParameters {
  SolutionUniqueName: string;
}

/**
 * RetrieveDependenciesForUninstall request message
 *
 * Web API Function: RetrieveDependenciesForUninstall
 */
export class RetrieveDependenciesForUninstallRequest
  extends OrganizationRequest
  implements Executable<RetrieveDependenciesForUninstallResponse>
{
  declare readonly Parameters: Readonly<RetrieveDependenciesForUninstallRequestParameters>;

  constructor(parameters: RetrieveDependenciesForUninstallRequestParameters) {
    super("RetrieveDependenciesForUninstall", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveDependenciesForUninstall`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.SolutionUniqueName !== undefined) {
      aliases.push(`SolutionUniqueName=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.SolutionUniqueName, "Edm.String"));
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

  async parseResponse(response: Response): Promise<RetrieveDependenciesForUninstallResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204)
      return RetrieveDependenciesForUninstallResponse.fromResponse(undefined);
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return RetrieveDependenciesForUninstallResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveDependenciesForUninstall function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveDependenciesForUninstallResult = Array<
  dependency & { "@odata.etag"?: string; "@odata.type"?: string }
>;

/**
 * RetrieveDependenciesForUninstall response message
 *
 * `result` is the value the RetrieveDependenciesForUninstall function returns (see {@link RetrieveDependenciesForUninstallResult}).
 */
export class RetrieveDependenciesForUninstallResponse extends OrganizationResponse {
  constructor(public result: RetrieveDependenciesForUninstallResult) {
    super("RetrieveDependenciesForUninstall");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveDependenciesForUninstallResponse {
    return new RetrieveDependenciesForUninstallResponse(
      data === undefined ? [] : (data as { value: RetrieveDependenciesForUninstallResult }).value
    );
  }
}
