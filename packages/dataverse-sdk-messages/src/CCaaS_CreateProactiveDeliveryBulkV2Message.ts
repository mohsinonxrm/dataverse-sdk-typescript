import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateProactiveDeliveryBulkV2 message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveDeliveryBulkV2RequestParameters {
  ProactiveDeliveries: string;
  RequestId?: string;
  ApiVersion: string;
  ProactiveEngagementConfigId: string;
}

/**
 * CCaaS_CreateProactiveDeliveryBulkV2 request message
 *
 * Web API Action: CCaaS_CreateProactiveDeliveryBulkV2
 */
export class CCaaS_CreateProactiveDeliveryBulkV2Request
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveDeliveryBulkV2Response>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveDeliveryBulkV2RequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveDeliveryBulkV2RequestParameters) {
    super("CCaaS_CreateProactiveDeliveryBulkV2", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveDeliveryBulkV2`;

    const body = requestBody({
      ProactiveDeliveries: this.Parameters.ProactiveDeliveries,
      RequestId: this.Parameters.RequestId,
      ApiVersion: this.Parameters.ApiVersion,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
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
    return CCaaS_CreateProactiveDeliveryBulkV2Response.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_CreateProactiveDeliveryBulkV2 action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateProactiveDeliveryBulkV2Result {
  "@odata.context"?: string;
  BatchId: string;
}

/**
 * CCaaS_CreateProactiveDeliveryBulkV2 response message
 *
 * `result` is the value the CCaaS_CreateProactiveDeliveryBulkV2 action returns (see {@link CCaaS_CreateProactiveDeliveryBulkV2Result}).
 */
export class CCaaS_CreateProactiveDeliveryBulkV2Response extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveDeliveryBulkV2Result) {
    super("CCaaS_CreateProactiveDeliveryBulkV2");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_CreateProactiveDeliveryBulkV2Response {
    return new CCaaS_CreateProactiveDeliveryBulkV2Response(
      data as CCaaS_CreateProactiveDeliveryBulkV2Result
    );
  }
}
