import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CancelDeliveryTask message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CancelDeliveryTaskRequestParameters {
  DeliveryTaskId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CancelDeliveryTask request message
 *
 * Web API Action: CCaaS_CancelDeliveryTask
 */
export class CCaaS_CancelDeliveryTaskRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CancelDeliveryTaskResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CancelDeliveryTaskRequestParameters>;

  constructor(parameters: CCaaS_CancelDeliveryTaskRequestParameters) {
    super("CCaaS_CancelDeliveryTask", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CancelDeliveryTask`;

    const body = requestBody({
      DeliveryTaskId: this.Parameters.DeliveryTaskId,
      ApiVersion: this.Parameters.ApiVersion,
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
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CancelDeliveryTaskResponse());
  }
}

/**
 * CCaaS_CancelDeliveryTask response message
 */
export class CCaaS_CancelDeliveryTaskResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CancelDeliveryTask");
  }

  static fromResponse(_data?: unknown): CCaaS_CancelDeliveryTaskResponse {
    return new CCaaS_CancelDeliveryTaskResponse();
  }
}
