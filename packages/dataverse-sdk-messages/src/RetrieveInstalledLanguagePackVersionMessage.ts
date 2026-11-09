import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveInstalledLanguagePackVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveInstalledLanguagePackVersionRequestParameters {
  Language: number;
}

/**
 * RetrieveInstalledLanguagePackVersion request message
 *
 * Web API Function: RetrieveInstalledLanguagePackVersion
 */
export class RetrieveInstalledLanguagePackVersionRequest
  extends OrganizationRequest
  implements Executable<RetrieveInstalledLanguagePackVersionResponse>
{
  declare readonly Parameters: Readonly<RetrieveInstalledLanguagePackVersionRequestParameters>;

  constructor(parameters: RetrieveInstalledLanguagePackVersionRequestParameters) {
    super("RetrieveInstalledLanguagePackVersion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveInstalledLanguagePackVersion`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.Language !== undefined) {
      aliases.push(`Language=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.Language, "Edm.Int32"));
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

  async parseResponse(response: Response): Promise<RetrieveInstalledLanguagePackVersionResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveInstalledLanguagePackVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveInstalledLanguagePackVersion function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveInstalledLanguagePackVersionResult {
  "@odata.context"?: string;
  Version: string;
}

/**
 * RetrieveInstalledLanguagePackVersion response message
 *
 * `result` is the value the RetrieveInstalledLanguagePackVersion function returns (see {@link RetrieveInstalledLanguagePackVersionResult}).
 */
export class RetrieveInstalledLanguagePackVersionResponse extends OrganizationResponse {
  constructor(public result: RetrieveInstalledLanguagePackVersionResult) {
    super("RetrieveInstalledLanguagePackVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveInstalledLanguagePackVersionResponse {
    return new RetrieveInstalledLanguagePackVersionResponse(
      data as RetrieveInstalledLanguagePackVersionResult
    );
  }
}
