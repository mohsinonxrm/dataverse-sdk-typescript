import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ValidateCustomMessagingApplicationResponse as msdyn_ValidateCustomMessagingApplicationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ValidateCustomMessagingApplication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateCustomMessagingApplicationRequestParameters {
  CustomMessagingBCRMSAppId: string;
  CustomMessagingBCRRecordId?: string;
  CustomMessagingBCRMSAppSecret: string;
}

/**
 * msdyn_ValidateCustomMessagingApplication request message
 *
 * Web API Action: msdyn_ValidateCustomMessagingApplication
 */
export class msdyn_ValidateCustomMessagingApplicationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateCustomMessagingApplicationResponse>
{
  declare readonly Parameters: Readonly<msdyn_ValidateCustomMessagingApplicationRequestParameters>;

  constructor(parameters: msdyn_ValidateCustomMessagingApplicationRequestParameters) {
    super("msdyn_ValidateCustomMessagingApplication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateCustomMessagingApplication`;

    const body = requestBody({
      CustomMessagingBCRMSAppId: this.Parameters.CustomMessagingBCRMSAppId,
      CustomMessagingBCRRecordId: this.Parameters.CustomMessagingBCRRecordId,
      CustomMessagingBCRMSAppSecret: this.Parameters.CustomMessagingBCRMSAppSecret,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_ValidateCustomMessagingApplicationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ValidateCustomMessagingApplicationResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_ValidateCustomMessagingApplication response message
 */
export class msdyn_ValidateCustomMessagingApplicationResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateCustomMessagingApplicationResponseData) {
    super("msdyn_ValidateCustomMessagingApplication");
  }

  static fromResponse(data: unknown): msdyn_ValidateCustomMessagingApplicationResponse {
    return new msdyn_ValidateCustomMessagingApplicationResponse(
      responseObject<msdyn_ValidateCustomMessagingApplicationResponseData>(data)
    );
  }
}
