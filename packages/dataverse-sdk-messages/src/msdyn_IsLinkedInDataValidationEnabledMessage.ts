import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_IsLinkedInDataValidationEnabled request message
 *
 * Web API Action: msdyn_IsLinkedInDataValidationEnabled
 */
export class msdyn_IsLinkedInDataValidationEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsLinkedInDataValidationEnabledResponse>
{
  constructor() {
    super("msdyn_IsLinkedInDataValidationEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsLinkedInDataValidationEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsLinkedInDataValidationEnabledResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_IsLinkedInDataValidationEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_IsLinkedInDataValidationEnabled action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsLinkedInDataValidationEnabledResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_IsLinkedInDataValidationEnabled response message
 *
 * `result` is the value the msdyn_IsLinkedInDataValidationEnabled action returns (see {@link msdyn_IsLinkedInDataValidationEnabledResult}).
 */
export class msdyn_IsLinkedInDataValidationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsLinkedInDataValidationEnabledResult) {
    super("msdyn_IsLinkedInDataValidationEnabled");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_IsLinkedInDataValidationEnabledResponse {
    return new msdyn_IsLinkedInDataValidationEnabledResponse(
      data as msdyn_IsLinkedInDataValidationEnabledResult
    );
  }
}
