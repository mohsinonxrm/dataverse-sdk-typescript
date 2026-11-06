import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_CreateProactiveDeliveryBulkV2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateProactiveDeliveryBulkV2Response {
  "@odata.context"?: string;
  BatchId: string;
}

/**
 * Parameters of the CCaaS_CreateProactiveDeliveryBulkV2 action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveDeliveryBulkV2ActionParameters {
  ProactiveDeliveries: string;
  RequestId?: string;
  ApiVersion: string;
  ProactiveEngagementConfigId: string;
}

/**
 * CCaaS_CreateProactiveDeliveryBulkV2 action
 *
 * Unbound action
 */
export class CCaaS_CreateProactiveDeliveryBulkV2Action implements Executable<CCaaS_CreateProactiveDeliveryBulkV2Response> {
  constructor(public readonly parameters: CCaaS_CreateProactiveDeliveryBulkV2ActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveDeliveryBulkV2`;

    const body = requestBody({
      ProactiveDeliveries: this.parameters.ProactiveDeliveries,
      RequestId: this.parameters.RequestId,
      ApiVersion: this.parameters.ApiVersion,
      ProactiveEngagementConfigId: this.parameters.ProactiveEngagementConfigId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveDeliveryBulkV2Response> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_CreateProactiveDeliveryBulkV2Response;
  }
}
