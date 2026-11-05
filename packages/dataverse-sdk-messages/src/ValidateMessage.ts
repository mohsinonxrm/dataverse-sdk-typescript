import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  TypedActivitypointer,
  ValidateResponse as ValidateResponseData,
} from "./types/index.js";

/**
 * Validate request message
 *
 * Web API Action: Validate
 */
export class ValidateRequest extends OrganizationRequest implements Executable<ValidateResponse> {
  constructor(public activities: TypedActivitypointer[]) {
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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ValidateResponse> {
    const data = await response.json();
    return ValidateResponse.fromResponse(data);
  }
}

/**
 * Validate response message
 */
export class ValidateResponse extends OrganizationResponse {
  constructor(public result: ValidateResponseData) {
    super("Validate");
  }

  static fromResponse(data: unknown): ValidateResponse {
    return new ValidateResponse(responseObject<ValidateResponseData>(data));
  }
}
