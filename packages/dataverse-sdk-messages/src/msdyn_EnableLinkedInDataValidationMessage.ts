import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_EnableLinkedInDataValidationResponse as msdyn_EnableLinkedInDataValidationResponseData } from "./types/index.js";

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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_EnableLinkedInDataValidationResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_EnableLinkedInDataValidation response message
 */
export class msdyn_EnableLinkedInDataValidationResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableLinkedInDataValidationResponseData) {
    super("msdyn_EnableLinkedInDataValidation");
  }

  static fromResponse(data: unknown): msdyn_EnableLinkedInDataValidationResponse {
    return new msdyn_EnableLinkedInDataValidationResponse(
      responseObject<msdyn_EnableLinkedInDataValidationResponseData>(data)
    );
  }
}
