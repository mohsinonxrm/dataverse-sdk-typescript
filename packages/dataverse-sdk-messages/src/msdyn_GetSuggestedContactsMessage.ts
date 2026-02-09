import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSuggestedContacts request message
 *
 * Web API Action: msdyn_GetSuggestedContacts
 */
export class msdyn_GetSuggestedContactsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSuggestedContactsResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string
  ) {
    super("msdyn_GetSuggestedContacts");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSuggestedContacts`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetSuggestedContactsResponse> {
    const data = await response.json();
    return msdyn_GetSuggestedContactsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
    };
  }
}

/**
 * msdyn_GetSuggestedContacts response message
 */
export class msdyn_GetSuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSuggestedContactsResponse) {
    super("msdyn_GetSuggestedContacts");
  }

  static fromResponse(data: unknown): msdyn_GetSuggestedContactsResponse {
    return new msdyn_GetSuggestedContactsResponse((data as any).value);
  }
}
