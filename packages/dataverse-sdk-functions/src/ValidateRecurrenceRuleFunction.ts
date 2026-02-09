import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurrencerule } from "./types/index.js";

/**
 * Response from ValidateRecurrenceRule function
 */
export interface ValidateRecurrenceRuleResponse {
  Description: string;
}

/**
 * ValidateRecurrenceRule function
 *
 * Unbound function
 */
export class ValidateRecurrenceRuleFunction implements Executable<ValidateRecurrenceRuleResponse> {
  constructor(public readonly target: recurrencerule) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateRecurrenceRule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", JSON.stringify(this.target));
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

  async parseResponse(response: Response): Promise<ValidateRecurrenceRuleResponse> {
    const data = await response.json();
    return data as ValidateRecurrenceRuleResponse;
  }
}
