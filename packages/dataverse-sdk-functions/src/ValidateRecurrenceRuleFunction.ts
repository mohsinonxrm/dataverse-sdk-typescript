import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { recurrencerule } from "./types/index.js";

/**
 * Response from ValidateRecurrenceRule function
 */
export interface ValidateRecurrenceRuleResponse {
  Description: string;
}

/**
 * Parameters of the ValidateRecurrenceRule function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRecurrenceRuleFunctionParameters {
  Target: recurrencerule;
}

/**
 * ValidateRecurrenceRule function
 *
 * Unbound function
 */
export class ValidateRecurrenceRuleFunction implements Executable<ValidateRecurrenceRuleResponse> {
  constructor(public readonly parameters: ValidateRecurrenceRuleFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateRecurrenceRule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append("@p1", JSON.stringify(this.parameters.Target));
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ValidateRecurrenceRuleResponse;
    return (await response.json()) as ValidateRecurrenceRuleResponse;
  }
}
