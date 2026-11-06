import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsLinkedInDataValidationEnabledResponse as msdyn_IsLinkedInDataValidationEnabledResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_IsLinkedInDataValidationEnabledResponse.fromResponse({});
    return msdyn_IsLinkedInDataValidationEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IsLinkedInDataValidationEnabled response message
 */
export class msdyn_IsLinkedInDataValidationEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsLinkedInDataValidationEnabledResponseData) {
    super("msdyn_IsLinkedInDataValidationEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsLinkedInDataValidationEnabledResponse {
    return new msdyn_IsLinkedInDataValidationEnabledResponse(
      responseObject<msdyn_IsLinkedInDataValidationEnabledResponseData>(data)
    );
  }
}
