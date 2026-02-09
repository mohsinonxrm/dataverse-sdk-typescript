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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableLinkedInDataValidationResponse> {
    const data = await response.json();
    return msdyn_EnableLinkedInDataValidationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_EnableLinkedInDataValidation response message
 */
export class msdyn_EnableLinkedInDataValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableLinkedInDataValidationResponse) {
    super("msdyn_EnableLinkedInDataValidation");
  }

  static fromResponse(data: unknown): msdyn_EnableLinkedInDataValidationResponse {
    return new msdyn_EnableLinkedInDataValidationResponse((data as any).value);
  }
}
