import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ValidateCustomMessagingApplication action
 */
export interface msdyn_ValidateCustomMessagingApplicationResponse {
  IsValidBCR: boolean;
  LastValidatedDate: string;
}

/**
 * msdyn_ValidateCustomMessagingApplication action
 *
 * Unbound action
 */
export class msdyn_ValidateCustomMessagingApplicationAction implements Executable<msdyn_ValidateCustomMessagingApplicationResponse> {
  constructor(
    public readonly customMessagingBCRMSAppId: string,
    public readonly customMessagingBCRRecordId: string,
    public readonly customMessagingBCRMSAppSecret: string
  ) {}

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_ValidateCustomMessagingApplicationResponse> {
    const data = await response.json();
    return data as msdyn_ValidateCustomMessagingApplicationResponse;
  }
}
