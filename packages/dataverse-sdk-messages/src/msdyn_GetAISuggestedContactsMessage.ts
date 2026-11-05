import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetAISuggestedContactsResponse as msdyn_GetAISuggestedContactsResponseData } from "./types/index.js";

/**
 * msdyn_GetAISuggestedContacts request message
 *
 * Web API Action: msdyn_GetAISuggestedContacts
 */
export class msdyn_GetAISuggestedContactsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetAISuggestedContactsResponse>
{
  constructor(
    public entityLogicalName: string,
    public recordId: string
  ) {
    super("msdyn_GetAISuggestedContacts");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetAISuggestedContacts`;

    const body: Record<string, unknown> = {
      EntityLogicalName: this.entityLogicalName,
      RecordId: this.recordId,
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

  async parseResponse(response: Response): Promise<msdyn_GetAISuggestedContactsResponse> {
    const data = await response.json();
    return msdyn_GetAISuggestedContactsResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetAISuggestedContacts response message
 */
export class msdyn_GetAISuggestedContactsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetAISuggestedContactsResponseData) {
    super("msdyn_GetAISuggestedContacts");
  }

  static fromResponse(data: unknown): msdyn_GetAISuggestedContactsResponse {
    return new msdyn_GetAISuggestedContactsResponse(
      responseObject<msdyn_GetAISuggestedContactsResponseData>(data)
    );
  }
}
