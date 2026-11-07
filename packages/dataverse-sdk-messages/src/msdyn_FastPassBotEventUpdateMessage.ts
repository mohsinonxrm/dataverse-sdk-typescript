import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_FastPassBotEventUpdate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FastPassBotEventUpdateRequestParameters {
  msdyn_PreImageRecord: EntityReference | AnyEntityPayload;
  msdyn_PostImageRecord: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_FastPassBotEventUpdate request message
 *
 * Web API Action: msdyn_FastPassBotEventUpdate
 */
export class msdyn_FastPassBotEventUpdateRequest
  extends OrganizationRequest
  implements Executable<msdyn_FastPassBotEventUpdateResponse>
{
  declare readonly Parameters: Readonly<msdyn_FastPassBotEventUpdateRequestParameters>;

  constructor(parameters: msdyn_FastPassBotEventUpdateRequestParameters) {
    super("msdyn_FastPassBotEventUpdate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FastPassBotEventUpdate`;

    const body = requestBody({
      msdyn_PreImageRecord: this.Parameters.msdyn_PreImageRecord,
      msdyn_PostImageRecord: this.Parameters.msdyn_PostImageRecord,
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

  parseResponse(_response: Response): Promise<msdyn_FastPassBotEventUpdateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_FastPassBotEventUpdateResponse());
  }
}

/**
 * msdyn_FastPassBotEventUpdate response message
 */
export class msdyn_FastPassBotEventUpdateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_FastPassBotEventUpdate");
  }

  static fromResponse(_data?: unknown): msdyn_FastPassBotEventUpdateResponse {
    return new msdyn_FastPassBotEventUpdateResponse();
  }
}
