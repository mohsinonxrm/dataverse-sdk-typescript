import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_ValidateCustomMessagingApplicationResponse as msdyn_ValidateCustomMessagingApplicationResponseData } from "./types/index.js";

/**
 * msdyn_ValidateCustomMessagingApplication request message
 *
 * Web API Action: msdyn_ValidateCustomMessagingApplication
 */
export class msdyn_ValidateCustomMessagingApplicationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ValidateCustomMessagingApplicationResponse>
{
  constructor(
    public customMessagingBCRMSAppId: string,
    public customMessagingBCRRecordId: string | undefined,
    public customMessagingBCRMSAppSecret: string
  ) {
    super("msdyn_ValidateCustomMessagingApplication");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateCustomMessagingApplication`;

    const body: Record<string, unknown> = {
      CustomMessagingBCRMSAppId: this.customMessagingBCRMSAppId,
      CustomMessagingBCRRecordId: this.customMessagingBCRRecordId,
      CustomMessagingBCRMSAppSecret: this.customMessagingBCRMSAppSecret,
    };

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
    const data = await response.json();
    return msdyn_ValidateCustomMessagingApplicationResponse.fromResponse(data);
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
