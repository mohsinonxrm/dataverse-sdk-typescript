import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateSuggestedContactResponse as msdyn_CreateSuggestedContactResponseData } from "./types/index.js";

/**
 * msdyn_CreateSuggestedContact request message
 *
 * Web API Action: msdyn_CreateSuggestedContact
 */
export class msdyn_CreateSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedContactResponse>
{
  constructor(public suggestedContactId: string) {
    super("msdyn_CreateSuggestedContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedContact`;

    const body: Record<string, unknown> = {
      SuggestedContactId: this.suggestedContactId,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedContactResponse> {
    const data = await response.json();
    return msdyn_CreateSuggestedContactResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateSuggestedContact response message
 */
export class msdyn_CreateSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedContactResponseData) {
    super("msdyn_CreateSuggestedContact");
  }

  static fromResponse(data: unknown): msdyn_CreateSuggestedContactResponse {
    return new msdyn_CreateSuggestedContactResponse(
      responseObject<msdyn_CreateSuggestedContactResponseData>(data)
    );
  }
}
