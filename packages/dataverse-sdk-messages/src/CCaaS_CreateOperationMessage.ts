import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateOperationRequestParameters {
  ApiVersion: string;
  ProactiveEngagementConfigId?: string;
  DeliveryId?: string;
  Operation: string;
}

/**
 * CCaaS_CreateOperation request message
 *
 * Web API Action: CCaaS_CreateOperation
 */
export class CCaaS_CreateOperationRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateOperationResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateOperationRequestParameters>;

  constructor(parameters: CCaaS_CreateOperationRequestParameters) {
    super("CCaaS_CreateOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateOperation`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      DeliveryId: this.Parameters.DeliveryId,
      Operation: this.Parameters.Operation,
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

  parseResponse(_response: Response): Promise<CCaaS_CreateOperationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CCaaS_CreateOperationResponse());
  }
}

/**
 * CCaaS_CreateOperation response message
 */
export class CCaaS_CreateOperationResponse extends OrganizationResponse {
  constructor() {
    super("CCaaS_CreateOperation");
  }

  static fromResponse(_data?: unknown): CCaaS_CreateOperationResponse {
    return new CCaaS_CreateOperationResponse();
  }
}
