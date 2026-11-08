import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Parameters of the RetrieveProvisionedLanguagePackVersion message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveProvisionedLanguagePackVersionRequestParameters {
  Language: number;
}

/**
 * RetrieveProvisionedLanguagePackVersion request message
 *
 * Web API Function: RetrieveProvisionedLanguagePackVersion
 */
export class RetrieveProvisionedLanguagePackVersionRequest
  extends OrganizationRequest
  implements Executable<RetrieveProvisionedLanguagePackVersionResponse>
{
  declare readonly Parameters: Readonly<RetrieveProvisionedLanguagePackVersionRequestParameters>;

  constructor(parameters: RetrieveProvisionedLanguagePackVersionRequestParameters) {
    super("RetrieveProvisionedLanguagePackVersion", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveProvisionedLanguagePackVersion`;

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

  async parseResponse(response: Response): Promise<RetrieveProvisionedLanguagePackVersionResponse> {
    // The body is the complex value, with its @odata.context
    return RetrieveProvisionedLanguagePackVersionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RetrieveProvisionedLanguagePackVersion function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RetrieveProvisionedLanguagePackVersionResult {
  "@odata.context"?: string;
  Version: string;
}

/**
 * RetrieveProvisionedLanguagePackVersion response message
 *
 * `result` is the value the RetrieveProvisionedLanguagePackVersion function returns (see {@link RetrieveProvisionedLanguagePackVersionResult}).
 */
export class RetrieveProvisionedLanguagePackVersionResponse extends OrganizationResponse {
  constructor(public result: RetrieveProvisionedLanguagePackVersionResult) {
    super("RetrieveProvisionedLanguagePackVersion");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RetrieveProvisionedLanguagePackVersionResponse {
    return new RetrieveProvisionedLanguagePackVersionResponse(
      data as RetrieveProvisionedLanguagePackVersionResult
    );
  }
}
