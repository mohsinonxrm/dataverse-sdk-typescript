import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { AppValidationResponse } from "./types/index.js";

/**
 * Parameters of the ValidateApp message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateAppRequestParameters {
  AppModuleId: string;
}

/**
 * ValidateApp request message
 *
 * Web API Function: ValidateApp
 */
export class ValidateAppRequest
  extends OrganizationRequest
  implements Executable<ValidateAppResponse>
{
  declare readonly Parameters: Readonly<ValidateAppRequestParameters>;

  constructor(parameters: ValidateAppRequestParameters) {
    super("ValidateApp", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateApp`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.Parameters.AppModuleId !== undefined) {
      aliases.push(`AppModuleId=@p1`);
      params.append("@p1", formatParameterAlias(this.Parameters.AppModuleId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<ValidateAppResponse> {
    // The body is the complex value, with its @odata.context
    return ValidateAppResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the ValidateApp function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateAppResult {
  "@odata.context"?: string;
  AppValidationResponse: AppValidationResponse;
}

/**
 * ValidateApp response message
 *
 * `result` is the value the ValidateApp function returns (see {@link ValidateAppResult}).
 */
export class ValidateAppResponse extends OrganizationResponse {
  constructor(public result: ValidateAppResult) {
    super("ValidateApp");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateAppResponse {
    return new ValidateAppResponse(data as ValidateAppResult);
  }
}
