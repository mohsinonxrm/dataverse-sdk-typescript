import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CancelDeliveryTask action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_CancelDeliveryTaskResponse = void;

/**
 * Parameters of the CCaaS_CancelDeliveryTask action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CancelDeliveryTaskActionParameters {
  DeliveryTaskId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CancelDeliveryTask action
 *
 * Unbound action
 */
export class CCaaS_CancelDeliveryTaskAction implements Executable<CCaaS_CancelDeliveryTaskResponse> {
  constructor(public readonly parameters: CCaaS_CancelDeliveryTaskActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CancelDeliveryTask`;

    const body = requestBody({
      DeliveryTaskId: this.parameters.DeliveryTaskId,
      ApiVersion: this.parameters.ApiVersion,
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

  parseResponse(_response: Response): Promise<CCaaS_CancelDeliveryTaskResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
