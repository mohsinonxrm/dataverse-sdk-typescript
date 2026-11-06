import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_DismissSuggestedContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissSuggestedContactRequestParameters {
  SuggestedContactId: string;
  DismissContact: boolean;
}

/**
 * msdyn_DismissSuggestedContact request message
 *
 * Web API Action: msdyn_DismissSuggestedContact
 */
export class msdyn_DismissSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_DismissSuggestedContactResponse>
{
  declare readonly Parameters: Readonly<msdyn_DismissSuggestedContactRequestParameters>;

  constructor(parameters: msdyn_DismissSuggestedContactRequestParameters) {
    super("msdyn_DismissSuggestedContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.Parameters.SuggestedContactId,
      DismissContact: this.Parameters.DismissContact,
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

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedContactResponse> {
    // No return value (204 No Content)
    return new msdyn_DismissSuggestedContactResponse();
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
