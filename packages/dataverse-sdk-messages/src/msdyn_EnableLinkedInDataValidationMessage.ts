import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableLinkedInDataValidation request message
 *
 * Web API Action: msdyn_EnableLinkedInDataValidation
 */
export class msdyn_EnableLinkedInDataValidationRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableLinkedInDataValidationResponse>
{
  constructor() {
    super("msdyn_EnableLinkedInDataValidation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableLinkedInDataValidation`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableLinkedInDataValidationResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_EnableLinkedInDataValidationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EnableLinkedInDataValidation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EnableLinkedInDataValidationResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_EnableLinkedInDataValidation response message
 *
 * `result` is the value the msdyn_EnableLinkedInDataValidation action returns (see {@link msdyn_EnableLinkedInDataValidationResult}).
 */
export class msdyn_EnableLinkedInDataValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableLinkedInDataValidationResult) {
    super("msdyn_EnableLinkedInDataValidation");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EnableLinkedInDataValidationResponse {
    return new msdyn_EnableLinkedInDataValidationResponse(
      data as msdyn_EnableLinkedInDataValidationResult
    );
  }
}
