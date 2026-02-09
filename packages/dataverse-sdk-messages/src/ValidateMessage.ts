import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { activitypointer } from "./types/index.js";

/**
 * Validate request message
 *
 * Web API Action: Validate
 */
export class ValidateRequest extends OrganizationRequest implements Executable<ValidateResponse> {
  constructor(public activities: activitypointer[]) {
    super("Validate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Validate`;

    const body: Record<string, unknown> = {
      Activities: this.activities,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ValidateResponse> {
    const data = await response.json();
    return ValidateResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Activities: this.activities,
    };
  }
}

/**
 * Validate response message
 */
export class ValidateResponse extends OrganizationResponse {
  constructor(public result: ValidateResponse) {
    super("Validate");
  }

  static fromResponse(data: unknown): ValidateResponse {
    return new ValidateResponse((data as any).value);
  }
}
