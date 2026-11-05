import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UserOptOutActor request message
 *
 * Web API Action: msdyn_UserOptOutActor
 */
export class msdyn_UserOptOutActorRequest
  extends OrganizationRequest
  implements Executable<msdyn_UserOptOutActorResponse>
{
  constructor(public inputData: string) {
    super("msdyn_UserOptOutActor");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserOptOutActor`;

    const body: Record<string, unknown> = {
      InputData: this.inputData,
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

  async parseResponse(response: Response): Promise<msdyn_UserOptOutActorResponse> {
    // No return value (204 No Content)
    return new msdyn_UserOptOutActorResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      InputData: this.inputData,
    };
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
