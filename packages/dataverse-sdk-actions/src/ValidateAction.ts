import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { ValidationResult, activitypointer } from "./types/index.js";

/**
 * Response from Validate action
 */
export interface ValidateResponse {
  Result: ValidationResult[];
}

/**
 * Validate action
 *
 * Unbound action
 */
export class ValidateAction implements Executable<ValidateResponse> {
  constructor(public readonly activities: activitypointer[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Validate`;

    const body: Record<string, unknown> = {
      Activities: this.activities,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ValidateResponse> {
    const data = await response.json();
    return data as ValidateResponse;
  }
}
