import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatAliasValue } from "./internal/odataLiteral.js";
import type { AppValidationResponse } from "./types/index.js";

/**
 * Response from ValidateApp function
 */
export interface ValidateAppResponse {
  AppValidationResponse: AppValidationResponse;
}

/**
 * ValidateApp function
 *
 * Unbound function
 */
export class ValidateAppFunction implements Executable<ValidateAppResponse> {
  constructor(public readonly appModuleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateApp`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.appModuleId !== undefined) {
      aliases.push(`AppModuleId=@p1`);
      params.append("@p1", formatAliasValue(this.appModuleId));
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
    const data = await response.json();
    return data as ValidateAppResponse;
  }
}
