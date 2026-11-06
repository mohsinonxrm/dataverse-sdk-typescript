import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_CreateProactiveDeliveryBulkV2Response as CCaaS_CreateProactiveDeliveryBulkV2ResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_CreateProactiveDeliveryBulkV2Response.fromResponse({});
    return CCaaS_CreateProactiveDeliveryBulkV2Response.fromResponse(await response.json());
  }
}

/**
 * CCaaS_CreateProactiveDeliveryBulkV2 response message
 */
export class CCaaS_CreateProactiveDeliveryBulkV2Response extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveDeliveryBulkV2ResponseData) {
    super("CCaaS_CreateProactiveDeliveryBulkV2");
  }

  static fromResponse(data: unknown): CCaaS_CreateProactiveDeliveryBulkV2Response {
    return new CCaaS_CreateProactiveDeliveryBulkV2Response(
      responseObject<CCaaS_CreateProactiveDeliveryBulkV2ResponseData>(data)
    );
  }
}
