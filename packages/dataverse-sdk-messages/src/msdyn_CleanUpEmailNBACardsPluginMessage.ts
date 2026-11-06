import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CleanUpEmailNBACardsPlugin message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanUpEmailNBACardsPluginRequestParameters {
  InputData?: string;
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin request message
 *
 * Web API Action: msdyn_CleanUpEmailNBACardsPlugin
 */
export class msdyn_CleanUpEmailNBACardsPluginRequest
  extends OrganizationRequest
  implements Executable<msdyn_CleanUpEmailNBACardsPluginResponse>
{
  declare readonly Parameters: Readonly<msdyn_CleanUpEmailNBACardsPluginRequestParameters>;

  constructor(parameters: msdyn_CleanUpEmailNBACardsPluginRequestParameters = {}) {
    super("msdyn_CleanUpEmailNBACardsPlugin", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpEmailNBACardsPlugin`;

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

  parseResponse(_response: Response): Promise<msdyn_CleanUpEmailNBACardsPluginResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CleanUpEmailNBACardsPluginResponse());
  }
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin response message
 */
export class msdyn_CleanUpEmailNBACardsPluginResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CleanUpEmailNBACardsPlugin");
  }

  static fromResponse(_data?: unknown): msdyn_CleanUpEmailNBACardsPluginResponse {
    return new msdyn_CleanUpEmailNBACardsPluginResponse();
  }
}
