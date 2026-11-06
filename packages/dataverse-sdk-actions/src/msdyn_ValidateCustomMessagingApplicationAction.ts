import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ValidateCustomMessagingApplication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ValidateCustomMessagingApplicationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ValidateCustomMessagingApplicationResponse;
  }
}
