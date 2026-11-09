import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_EditAndSaveSuggestedContactResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_EditAndSaveSuggestedContact action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EditAndSaveSuggestedContactResult {
  "@odata.context"?: string;
  id: string;
}

/**
 * msdyn_EditAndSaveSuggestedContact response message
 *
 * `result` is the value the msdyn_EditAndSaveSuggestedContact action returns (see {@link msdyn_EditAndSaveSuggestedContactResult}).
 */
export class msdyn_EditAndSaveSuggestedContactResponse extends OrganizationResponse {
  constructor(public result: msdyn_EditAndSaveSuggestedContactResult) {
    super("msdyn_EditAndSaveSuggestedContact");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_EditAndSaveSuggestedContactResponse {
    return new msdyn_EditAndSaveSuggestedContactResponse(
      data as msdyn_EditAndSaveSuggestedContactResult
    );
  }
}
