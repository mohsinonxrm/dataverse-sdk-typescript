import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateProactiveSMSDelivery message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateProactiveSMSDeliveryRequestParameters {
  RequestId?: string;
  Windows?: string;
  DestinationPhoneNumber: string;
  ExpirationDate?: string;
  InputAttributes?: string;
  ProactiveEngagementConfigId: string;
  FirstResponseTimeoutMins?: string;
  Message: string;
  ContactId?: string;
  ApiVersion: string;
}

/**
 * CCaaS_CreateProactiveSMSDelivery request message
 *
 * Web API Action: CCaaS_CreateProactiveSMSDelivery
 */
export class CCaaS_CreateProactiveSMSDeliveryRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateProactiveSMSDeliveryResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateProactiveSMSDeliveryRequestParameters>;

  constructor(parameters: CCaaS_CreateProactiveSMSDeliveryRequestParameters) {
    super("CCaaS_CreateProactiveSMSDelivery", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateProactiveSMSDelivery`;

    const body = requestBody({
      RequestId: this.Parameters.RequestId,
      Windows: this.Parameters.Windows,
      DestinationPhoneNumber: this.Parameters.DestinationPhoneNumber,
      ExpirationDate: this.Parameters.ExpirationDate,
      InputAttributes: this.Parameters.InputAttributes,
      ProactiveEngagementConfigId: this.Parameters.ProactiveEngagementConfigId,
      FirstResponseTimeoutMins: this.Parameters.FirstResponseTimeoutMins,
      Message: this.Parameters.Message,
      ContactId: this.Parameters.ContactId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateProactiveSMSDeliveryResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_CreateProactiveSMSDeliveryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_CreateProactiveSMSDelivery action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateProactiveSMSDeliveryResult {
  "@odata.context"?: string;
  SMSDeliveryId: string;
}

/**
 * CCaaS_CreateProactiveSMSDelivery response message
 *
 * `result` is the value the CCaaS_CreateProactiveSMSDelivery action returns (see {@link CCaaS_CreateProactiveSMSDeliveryResult}).
 */
export class CCaaS_CreateProactiveSMSDeliveryResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateProactiveSMSDeliveryResult) {
    super("CCaaS_CreateProactiveSMSDelivery");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_CreateProactiveSMSDeliveryResponse {
    return new CCaaS_CreateProactiveSMSDeliveryResponse(
      data as CCaaS_CreateProactiveSMSDeliveryResult
    );
  }
}
