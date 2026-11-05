import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_liveworkstream, msdyn_ocphonenumber, msdyn_smsnumber } from "./types/index.js";

/**
 * Response from msdyn_msdyn_ValidateWorkStreamSMSConnection action
 */
export interface msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse {
  Output: string;
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection action
 *
 * Unbound action
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionAction implements Executable<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse> {
  constructor(
    public readonly ocPhoneNumberEntityReference: msdyn_ocphonenumber,
    public readonly workStreamEntityReference: msdyn_liveworkstream,
    public readonly sMSNumberEntityReference: msdyn_smsnumber,
    public readonly input: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_msdyn_ValidateWorkStreamSMSConnection`;

    const body: Record<string, unknown> = {
      OcPhoneNumberEntityReference: this.ocPhoneNumberEntityReference,
      WorkStreamEntityReference: this.workStreamEntityReference,
      SMSNumberEntityReference: this.sMSNumberEntityReference,
      Input: this.input,
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
  ): Promise<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse> {
    const data = await response.json();
    return data as msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse;
  }
}
