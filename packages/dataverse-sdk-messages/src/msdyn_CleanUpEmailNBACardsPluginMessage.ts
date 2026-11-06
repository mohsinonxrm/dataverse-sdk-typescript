import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CleanUpEmailNBACardsPlugin request message
 *
 * Web API Action: msdyn_CleanUpEmailNBACardsPlugin
 */
export class msdyn_CleanUpEmailNBACardsPluginRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanUpEmailNBACardsPluginResponse>
{
  constructor(public inputData: string) {
    super("msdyn_CleanUpEmailNBACardsPlugin");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpEmailNBACardsPlugin`;

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

  async parseResponse(response: Response): Promise<msdyn_CleanUpEmailNBACardsPluginResponse> {
    // No return value (204 No Content)
    return new msdyn_CleanUpEmailNBACardsPluginResponse();
  }
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin response message
 */
export class msdyn_CleanUpEmailNBACardsPluginResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CleanUpEmailNBACardsPlugin");
  }

  static fromResponse(_data: unknown): msdyn_CleanUpEmailNBACardsPluginResponse {
    return new msdyn_CleanUpEmailNBACardsPluginResponse();
  }
}
