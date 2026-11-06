import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ValidateCustomMessagingApplicationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ValidateCustomMessagingApplication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateCustomMessagingApplicationResult {
  "@odata.context"?: string;
  IsValidBCR: boolean;
  LastValidatedDate: string;
}

/**
 * msdyn_ValidateCustomMessagingApplication response message
 *
 * `result` is the value the msdyn_ValidateCustomMessagingApplication action returns (see {@link msdyn_ValidateCustomMessagingApplicationResult}).
 */
export class msdyn_ValidateCustomMessagingApplicationResponse extends OrganizationResponse {
  constructor(public result: msdyn_ValidateCustomMessagingApplicationResult) {
    super("msdyn_ValidateCustomMessagingApplication");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ValidateCustomMessagingApplicationResponse {
    return new msdyn_ValidateCustomMessagingApplicationResponse(
      data as msdyn_ValidateCustomMessagingApplicationResult
    );
  }
}
