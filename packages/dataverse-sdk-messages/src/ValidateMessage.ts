import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { TypedActivitypointer, ValidationResult } from "./types/index.js";

/**
 * Parameters of the Validate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ValidateRequestParameters {
  Activities: TypedActivitypointer[];
}

/**
 * Validate request message
 *
 * Web API Action: Validate
 */
export class ValidateRequest extends OrganizationRequest implements Executable<ValidateResponse> {
  declare readonly Parameters: Readonly<ValidateRequestParameters>;

  constructor(parameters: ValidateRequestParameters) {
    super("Validate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/Validate`;

    const body = requestBody({
      Activities: this.Parameters.Activities,
    });

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
    // The body is the complex value, with its @odata.context
    return ValidateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the Validate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface ValidateResult {
  "@odata.context"?: string;
  Result: ValidationResult[];
}

/**
 * Validate response message
 *
 * `result` is the value the Validate action returns (see {@link ValidateResult}).
 */
export class ValidateResponse extends OrganizationResponse {
  constructor(public result: ValidateResult) {
    super("Validate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): ValidateResponse {
    return new ValidateResponse(data as ValidateResult);
  }
}
