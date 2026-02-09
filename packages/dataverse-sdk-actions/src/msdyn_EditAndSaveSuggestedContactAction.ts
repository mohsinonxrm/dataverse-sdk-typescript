import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EditAndSaveSuggestedContact action
 */
export interface msdyn_EditAndSaveSuggestedContactResponse {
  id: string;
}

/**
 * msdyn_EditAndSaveSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_EditAndSaveSuggestedContactAction implements Executable<msdyn_EditAndSaveSuggestedContactResponse> {
  constructor(
    public readonly suggestedContactId: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly businessPhone: string,
    public readonly address: string,
    public readonly mobilePhone: string,
    public readonly accountId: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EditAndSaveSuggestedContactResponse> {
    const data = await response.json();
    return data as msdyn_EditAndSaveSuggestedContactResponse;
  }
}
