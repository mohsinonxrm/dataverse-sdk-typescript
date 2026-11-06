import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_FastPassBotEventUpdate request message
 *
 * Web API Action: msdyn_FastPassBotEventUpdate
 */
export class msdyn_FastPassBotEventUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_FastPassBotEventUpdateResponse>
{
  constructor(
    public msdyn_PreImageRecord: EntityReference | AnyEntityPayload,
    public msdyn_PostImageRecord: EntityReference | AnyEntityPayload
  ) {
    super("msdyn_FastPassBotEventUpdate");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FastPassBotEventUpdate`;

    const body: Record<string, unknown> = {
      msdyn_PreImageRecord: this.msdyn_PreImageRecord,
      msdyn_PostImageRecord: this.msdyn_PostImageRecord,
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

  async parseResponse(response: Response): Promise<msdyn_FastPassBotEventUpdateResponse> {
    // No return value (204 No Content)
    return new msdyn_FastPassBotEventUpdateResponse();
  }
}

/**
 * msdyn_FastPassBotEventUpdate response message
 */
export class msdyn_FastPassBotEventUpdateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_FastPassBotEventUpdate");
  }

  static fromResponse(_data: unknown): msdyn_FastPassBotEventUpdateResponse {
    return new msdyn_FastPassBotEventUpdateResponse();
  }
}
