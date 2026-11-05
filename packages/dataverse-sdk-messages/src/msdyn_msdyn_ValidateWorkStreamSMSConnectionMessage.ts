import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_liveworkstream, msdyn_ocphonenumber, msdyn_smsnumber } from "./types/index.js";

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection request message
 *
 * Web API Action: msdyn_msdyn_ValidateWorkStreamSMSConnection
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionRequest
  extends OrganizationRequest
  implements Executable<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse>
{
  constructor(
    public ocPhoneNumberEntityReference: msdyn_ocphonenumber,
    public workStreamEntityReference: msdyn_liveworkstream,
    public sMSNumberEntityReference: msdyn_smsnumber,
    public input: string
  ) {
    super("msdyn_msdyn_ValidateWorkStreamSMSConnection");
  }

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
    return msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      OcPhoneNumberEntityReference: this.ocPhoneNumberEntityReference,
      WorkStreamEntityReference: this.workStreamEntityReference,
      SMSNumberEntityReference: this.sMSNumberEntityReference,
      Input: this.input,
    };
  }
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection response message
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse) {
    super("msdyn_msdyn_ValidateWorkStreamSMSConnection");
  }

  static fromResponse(data: unknown): msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse {
    return new msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse((data as any).value);
  }
}
