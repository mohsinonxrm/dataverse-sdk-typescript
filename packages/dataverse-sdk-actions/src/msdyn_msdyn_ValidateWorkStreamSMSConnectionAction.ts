import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_liveworkstream, msdyn_ocphonenumber, msdyn_smsnumber } from "./types/index.js";

/**
 * Response from msdyn_msdyn_ValidateWorkStreamSMSConnection action
 */
export interface msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse {
  Output: string;
}

/**
 * Parameters of the msdyn_msdyn_ValidateWorkStreamSMSConnection action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_msdyn_ValidateWorkStreamSMSConnectionActionParameters {
  OcPhoneNumberEntityReference?: EntityReference | EntityPayload<msdyn_ocphonenumber>;
  WorkStreamEntityReference?: EntityReference | EntityPayload<msdyn_liveworkstream>;
  SMSNumberEntityReference?: EntityReference | EntityPayload<msdyn_smsnumber>;
  Input?: string;
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection action
 *
 * Unbound action
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionAction implements Executable<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse> {
  constructor(
    public readonly parameters: msdyn_msdyn_ValidateWorkStreamSMSConnectionActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_msdyn_ValidateWorkStreamSMSConnection`;

    const body = requestBody({
      OcPhoneNumberEntityReference: this.parameters.OcPhoneNumberEntityReference,
      WorkStreamEntityReference: this.parameters.WorkStreamEntityReference,
      SMSNumberEntityReference: this.parameters.SMSNumberEntityReference,
      Input: this.parameters.Input,
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
  ): Promise<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse;
    return (await response.json()) as msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse;
  }
}
