import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import type { recurrencerule } from './types/index.js';

/**
 * Response from the ValidateRecurrenceRule function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateRecurrenceRuleResponse {
  "@odata.context"?: string;
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
  constructor(
    public readonly parameters: ValidateRecurrenceRuleFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/ValidateRecurrenceRule`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.Target !== undefined) {
      aliases.push(`Target=@p1`);
      params.append('@p1', JSON.stringify(this.parameters.Target));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(',')})?${params.toString()}`;
    }

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<ValidateRecurrenceRuleResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as ValidateRecurrenceRuleResponse;
  }
}
