import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EditAndSaveSuggestedContact action
 */
export interface msdyn_EditAndSaveSuggestedContactResponse {
  id: string;
}

/**
 * Parameters of the msdyn_EditAndSaveSuggestedContact action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EditAndSaveSuggestedContactActionParameters {
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
 * msdyn_EditAndSaveSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_EditAndSaveSuggestedContactAction implements Executable<msdyn_EditAndSaveSuggestedContactResponse> {
  constructor(public readonly parameters: msdyn_EditAndSaveSuggestedContactActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditAndSaveSuggestedContact`;

    const body = requestBody({
      SuggestedContactId: this.parameters.SuggestedContactId,
      FirstName: this.parameters.FirstName,
      LastName: this.parameters.LastName,
      Email: this.parameters.Email,
      BusinessPhone: this.parameters.BusinessPhone,
      Address: this.parameters.Address,
      MobilePhone: this.parameters.MobilePhone,
      AccountId: this.parameters.AccountId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EditAndSaveSuggestedContactResponse;
  }
}
