import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_liveworkstream,
  msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse as msdyn_msdyn_ValidateWorkStreamSMSConnectionResponseData,
  msdyn_ocphonenumber,
  msdyn_smsnumber,
} from "./types/index.js";

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
    public ocPhoneNumberEntityReference?: EntityReference | EntityPayload<msdyn_ocphonenumber>,
    public workStreamEntityReference?: EntityReference | EntityPayload<msdyn_liveworkstream>,
    public sMSNumberEntityReference?: EntityReference | EntityPayload<msdyn_smsnumber>,
    public input?: string
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
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection response message
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_msdyn_ValidateWorkStreamSMSConnectionResponseData) {
    super("msdyn_msdyn_ValidateWorkStreamSMSConnection");
  }

  static fromResponse(data: unknown): msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse {
    return new msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse(
      responseObject<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponseData>(data)
    );
  }
}
