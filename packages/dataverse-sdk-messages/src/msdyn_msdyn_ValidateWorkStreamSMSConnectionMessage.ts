import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_liveworkstream,
  msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse as msdyn_msdyn_ValidateWorkStreamSMSConnectionResponseData,
  msdyn_ocphonenumber,
  msdyn_smsnumber,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse.fromResponse({});
    return msdyn_msdyn_ValidateWorkStreamSMSConnectionResponse.fromResponse(await response.json());
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
