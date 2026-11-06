import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_consentvalidateformResponse as msdynmkt_consentvalidateformResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_consentvalidateform message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentvalidateformRequestParameters {
  msdynmkt_editorname: string;
  validationType?: number;
  formBusinessUnitId?: string;
  complianceProfileId?: string;
  isDoubleOptInForciblyDisabled?: boolean;
  msdynmkt_formhtml: string;
}

/**
 * msdynmkt_consentvalidateform request message
 *
 * Web API Action: msdynmkt_consentvalidateform
 */
export class msdynmkt_consentvalidateformRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentvalidateformResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_consentvalidateformRequestParameters>;

  constructor(parameters: msdynmkt_consentvalidateformRequestParameters) {
    super("msdynmkt_consentvalidateform", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentvalidateform`;

    const body = requestBody({
      msdynmkt_editorname: this.Parameters.msdynmkt_editorname,
      validationType: this.Parameters.validationType,
      formBusinessUnitId: this.Parameters.formBusinessUnitId,
      complianceProfileId: this.Parameters.complianceProfileId,
      isDoubleOptInForciblyDisabled: this.Parameters.isDoubleOptInForciblyDisabled,
      msdynmkt_formhtml: this.Parameters.msdynmkt_formhtml,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentvalidateformResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_consentvalidateformResponse.fromResponse({});
    return msdynmkt_consentvalidateformResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_consentvalidateform response message
 */
export class msdynmkt_consentvalidateformResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentvalidateformResponseData) {
    super("msdynmkt_consentvalidateform");
  }

  static fromResponse(data: unknown): msdynmkt_consentvalidateformResponse {
    return new msdynmkt_consentvalidateformResponse(
      responseObject<msdynmkt_consentvalidateformResponseData>(data)
    );
  }
}
