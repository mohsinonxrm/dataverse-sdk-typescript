import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_liveworkstream, msdyn_ocphonenumber, msdyn_smsnumber } from "./types/index.js";

/**
 * Parameters of the msdyn_msdyn_ValidateWorkStreamSMSConnection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_msdyn_ValidateWorkStreamSMSConnectionRequestParameters {
  OcPhoneNumberEntityReference?: EntityReference | EntityPayload<msdyn_ocphonenumber>;
  WorkStreamEntityReference?: EntityReference | EntityPayload<msdyn_liveworkstream>;
  SMSNumberEntityReference?: EntityReference | EntityPayload<msdyn_smsnumber>;
  Input?: string;
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection request message
 *
 * Web API Action: msdyn_msdyn_ValidateWorkStreamSMSConnection
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionRequest
  extends OrganizationRequest
  implements Executable<msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse>
{
  declare readonly Parameters: Readonly<msdyn_msdyn_ValidateWorkStreamSMSConnectionRequestParameters>;

  constructor(parameters: msdyn_msdyn_ValidateWorkStreamSMSConnectionRequestParameters = {}) {
    super("msdyn_msdyn_ValidateWorkStreamSMSConnection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_msdyn_ValidateWorkStreamSMSConnection`;

    const body = requestBody({
      OcPhoneNumberEntityReference: this.Parameters.OcPhoneNumberEntityReference,
      WorkStreamEntityReference: this.Parameters.WorkStreamEntityReference,
      SMSNumberEntityReference: this.Parameters.SMSNumberEntityReference,
      Input: this.Parameters.Input,
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
    // The body is the complex value, with its @odata.context
    return msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_msdyn_ValidateWorkStreamSMSConnection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_msdyn_ValidateWorkStreamSMSConnectionResult {
  "@odata.context"?: string;
  Output: string;
}

/**
 * msdyn_msdyn_ValidateWorkStreamSMSConnection response message
 *
 * `result` is the value the msdyn_msdyn_ValidateWorkStreamSMSConnection action returns (see {@link msdyn_msdyn_ValidateWorkStreamSMSConnectionResult}).
 */
export class msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse extends OrganizationResponse {
  constructor(public result: msdyn_msdyn_ValidateWorkStreamSMSConnectionResult) {
    super("msdyn_msdyn_ValidateWorkStreamSMSConnection");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse {
    return new msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse(
      data as msdyn_msdyn_ValidateWorkStreamSMSConnectionResult
    );
  }
}
