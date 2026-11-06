import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateProactiveVoiceDelivery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveVoiceDeliveryRequestParameters {
  ExpirationDate?: string;
  DestinationPhoneNumber: string;
  RequestId?: string;
  ProactiveEngagementConfigId: string;
  ContactId?: string;
  ApiVersion: string;
  Windows?: string;
  InputAttributes?: string;
}

/**
 * CCaaS_CreateProactiveVoiceDelivery request message
 *
 * Web API Action: CCaaS_CreateProactiveVoiceDelivery
 */
export class CCaaS_CreateProactiveVoiceDeliveryRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveVoiceDeliveryResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveVoiceDeliveryRequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveVoiceDeliveryRequestParameters) {
    super("CCaaS_CreateProactiveVoiceDelivery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveVoiceDelivery`;

    const body = requestBody({
      ExpirationDate: this.Parameters.ExpirationDate,
      DestinationPhoneNumber: this.Parameters.DestinationPhoneNumber,
      RequestId: this.Parameters.RequestId,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      ContactId: this.Parameters.ContactId,
      ApiVersion: this.Parameters.ApiVersion,
      Windows: this.Parameters.Windows,
      InputAttributes: this.Parameters.InputAttributes,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveVoiceDeliveryResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_CreateProactiveVoiceDeliveryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_CreateProactiveVoiceDelivery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateProactiveVoiceDeliveryResult {
  "@odata.context"?: string;
  DeliveryId: string;
}

/**
 * CCaaS_CreateProactiveVoiceDelivery response message
 *
 * `result` is the value the CCaaS_CreateProactiveVoiceDelivery action returns (see {@link CCaaS_CreateProactiveVoiceDeliveryResult}).
 */
export class CCaaS_CreateProactiveVoiceDeliveryResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveVoiceDeliveryResult) {
    super("CCaaS_CreateProactiveVoiceDelivery");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_CreateProactiveVoiceDeliveryResponse {
    return new CCaaS_CreateProactiveVoiceDeliveryResponse(
      data as CCaaS_CreateProactiveVoiceDeliveryResult
    );
  }
}
