import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAcceleratorMailNotificationToAdmin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SalesAcceleratorMailNotificationToAdminResponse = void;

/**
 * Parameters of the msdyn_SalesAcceleratorMailNotificationToAdmin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAcceleratorMailNotificationToAdminActionParameters {
  InputData?: string;
}

/**
 * msdyn_SalesAcceleratorMailNotificationToAdmin action
 *
 * Unbound action
 */
export class msdyn_SalesAcceleratorMailNotificationToAdminAction implements Executable<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
  constructor(
    public readonly parameters: msdyn_SalesAcceleratorMailNotificationToAdminActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAcceleratorMailNotificationToAdmin`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  parseResponse(
    _response: Response
  ): Promise<msdyn_SalesAcceleratorMailNotificationToAdminResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
