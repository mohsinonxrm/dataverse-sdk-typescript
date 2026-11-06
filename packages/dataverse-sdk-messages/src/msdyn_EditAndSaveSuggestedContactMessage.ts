import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_EditAndSaveSuggestedContactResponse as msdyn_EditAndSaveSuggestedContactResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_EditAndSaveSuggestedContact message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EditAndSaveSuggestedContactRequestParameters {
  SuggestedContactId: string;
  FirstName: string;
  LastName: string;
  Email: string;
  BusinessPhone: string;
  Address: string;
  MobilePhone: string;
  AccountId: string;
}

/**
 * msdyn_EditAndSaveSuggestedContact request message
 *
 * Web API Action: msdyn_EditAndSaveSuggestedContact
 */
export class msdyn_EditAndSaveSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_EditAndSaveSuggestedContactResponse>
{
  declare readonly Parameters: Readonly<msdyn_EditAndSaveSuggestedContactRequestParameters>;

  constructor(parameters: msdyn_EditAndSaveSuggestedContactRequestParameters) {
    super("msdyn_EditAndSaveSuggestedContact", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditAndSaveSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.Parameters.SuggestedContactId,
      FirstName: this.Parameters.FirstName,
      LastName: this.Parameters.LastName,
      Email: this.Parameters.Email,
      BusinessPhone: this.Parameters.BusinessPhone,
      Address: this.Parameters.Address,
      MobilePhone: this.Parameters.MobilePhone,
      AccountId: this.Parameters.AccountId,
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

  async parseResponse(response: Response): Promise<msdyn_EditAndSaveSuggestedContactResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_EditAndSaveSuggestedContactResponse.fromResponse({});
    return msdyn_EditAndSaveSuggestedContactResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EditAndSaveSuggestedContact response message
 */
export class msdyn_EditAndSaveSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditAndSaveSuggestedContactResponseData) {
    super("msdyn_EditAndSaveSuggestedContact");
  }

  static fromResponse(data: unknown): msdyn_EditAndSaveSuggestedContactResponse {
    return new msdyn_EditAndSaveSuggestedContactResponse(
      responseObject<msdyn_EditAndSaveSuggestedContactResponseData>(data)
    );
  }
}
