import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EditAndSaveSuggestedContact request message
 *
 * Web API Action: msdyn_EditAndSaveSuggestedContact
 */
export class msdyn_EditAndSaveSuggestedContactRequest
  extends OrganizationRequest
  implements Executable<msdyn_EditAndSaveSuggestedContactResponse>
{
  constructor(
    public suggestedContactId: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public businessPhone: string,
    public address: string,
    public mobilePhone: string,
    public accountId: string
  ) {
    super("msdyn_EditAndSaveSuggestedContact");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditAndSaveSuggestedContact`;

    const body: Record<string, unknown> = {
      SuggestedContactId: this.suggestedContactId,
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      BusinessPhone: this.businessPhone,
      Address: this.address,
      MobilePhone: this.mobilePhone,
      AccountId: this.accountId,
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

  async parseResponse(response: Response): Promise<msdyn_EditAndSaveSuggestedContactResponse> {
    const data = await response.json();
    return msdyn_EditAndSaveSuggestedContactResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SuggestedContactId: this.suggestedContactId,
      FirstName: this.firstName,
      LastName: this.lastName,
      Email: this.email,
      BusinessPhone: this.businessPhone,
      Address: this.address,
      MobilePhone: this.mobilePhone,
      AccountId: this.accountId,
    };
  }
}

/**
 * msdyn_EditAndSaveSuggestedContact response message
 */
export class msdyn_EditAndSaveSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditAndSaveSuggestedContactResponse) {
    super("msdyn_EditAndSaveSuggestedContact");
  }

  static fromResponse(data: unknown): msdyn_EditAndSaveSuggestedContactResponse {
    return new msdyn_EditAndSaveSuggestedContactResponse((data as any).value);
  }
}
