import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_DismissSuggestedContact request message
 *
 * Web API Action: msdyn_DismissSuggestedContact
 */
export class msdyn_DismissSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissSuggestedContactResponse>
{
  constructor(
    public suggestedContactId: string,
    public dismissContact: boolean
  ) {
    super("msdyn_DismissSuggestedContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedContact`;

    const body: Record<string, unknown> = {
      SuggestedContactId: this.suggestedContactId,
      DismissContact: this.dismissContact,
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

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedContactResponse> {
    // No return value (204 No Content)
    return new msdyn_DismissSuggestedContactResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SuggestedContactId: this.suggestedContactId,
      DismissContact: this.dismissContact,
    };
  }
}

/**
 * msdyn_DismissSuggestedContact response message
 */
export class msdyn_DismissSuggestedContactResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_DismissSuggestedContact");
  }

  static fromResponse(_data: unknown): msdyn_DismissSuggestedContactResponse {
    return new msdyn_DismissSuggestedContactResponse();
  }
}
