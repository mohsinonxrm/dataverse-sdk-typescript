import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UserOptOutActor message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UserOptOutActorRequestParameters {
  InputData: string;
}

/**
 * msdyn_UserOptOutActor request message
 *
 * Web API Action: msdyn_UserOptOutActor
 */
export class msdyn_UserOptOutActorRequest
  extends OrganizationRequest
  implements Executable<msdyn_UserOptOutActorResponse>
{
  declare readonly Parameters: Readonly<msdyn_UserOptOutActorRequestParameters>;

  constructor(parameters: msdyn_UserOptOutActorRequestParameters) {
    super("msdyn_UserOptOutActor", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserOptOutActor`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserOptOutActorResponse> {
    // No return value (204 No Content)
    return new msdyn_UserOptOutActorResponse();
  }
}

/**
 * msdyn_UserOptOutActor response message
 */
export class msdyn_UserOptOutActorResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UserOptOutActor");
  }

  static fromResponse(_data: unknown): msdyn_UserOptOutActorResponse {
    return new msdyn_UserOptOutActorResponse();
  }
}
