import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ValidateCustomMessagingApplication action
 */
export interface msdyn_ValidateCustomMessagingApplicationResponse {
  IsValidBCR: boolean;
  LastValidatedDate: string;
}

/**
 * Parameters of the msdyn_ValidateCustomMessagingApplication action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ValidateCustomMessagingApplicationActionParameters {
  CustomMessagingBCRMSAppId: string;
  CustomMessagingBCRRecordId?: string;
  CustomMessagingBCRMSAppSecret: string;
}

/**
 * msdyn_ValidateCustomMessagingApplication action
 *
 * Unbound action
 */
export class msdyn_ValidateCustomMessagingApplicationAction implements Executable<msdyn_ValidateCustomMessagingApplicationResponse> {
  constructor(
    public readonly parameters: msdyn_ValidateCustomMessagingApplicationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ValidateCustomMessagingApplication`;

    const body = requestBody({
      CustomMessagingBCRMSAppId: this.parameters.CustomMessagingBCRMSAppId,
      CustomMessagingBCRRecordId: this.parameters.CustomMessagingBCRRecordId,
      CustomMessagingBCRMSAppSecret: this.parameters.CustomMessagingBCRMSAppSecret,
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
    return (text ? JSON.parse(text) : {}) as msdyn_ValidateCustomMessagingApplicationResponse;
  }
}
