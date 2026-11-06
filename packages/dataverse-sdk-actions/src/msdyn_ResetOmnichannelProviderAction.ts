import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ResetOmnichannelProvider action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ResetOmnichannelProviderResponse = void;

/**
 * Parameters of the msdyn_ResetOmnichannelProvider action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetOmnichannelProviderActionParameters {
  OrgBaseUrl: string;
}

/**
 * msdyn_ResetOmnichannelProvider action
 *
 * Unbound action
 */
export class msdyn_ResetOmnichannelProviderAction implements Executable<msdyn_ResetOmnichannelProviderResponse> {
  constructor(public readonly parameters: msdyn_ResetOmnichannelProviderActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetOmnichannelProvider`;

    const body = requestBody({
      OrgBaseUrl: this.parameters.OrgBaseUrl,
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

  parseResponse(_response: Response): Promise<msdyn_ResetOmnichannelProviderResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
