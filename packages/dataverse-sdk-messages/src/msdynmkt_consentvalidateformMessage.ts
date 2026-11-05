import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_consentvalidateformResponse as msdynmkt_consentvalidateformResponseData } from "./types/index.js";

/**
 * msdynmkt_consentvalidateform request message
 *
 * Web API Action: msdynmkt_consentvalidateform
 */
export class msdynmkt_consentvalidateformRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_consentvalidateformResponse>
{
  constructor(
    public msdynmkt_editorname: string,
    public validationType: number,
    public formBusinessUnitId: string,
    public complianceProfileId: string,
    public isDoubleOptInForciblyDisabled: boolean,
    public msdynmkt_formhtml: string
  ) {
    super("msdynmkt_consentvalidateform");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_consentvalidateform`;

    const body: Record<string, unknown> = {
      msdynmkt_editorname: this.msdynmkt_editorname,
      validationType: this.validationType,
      formBusinessUnitId: this.formBusinessUnitId,
      complianceProfileId: this.complianceProfileId,
      isDoubleOptInForciblyDisabled: this.isDoubleOptInForciblyDisabled,
      msdynmkt_formhtml: this.msdynmkt_formhtml,
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

  async parseResponse(response: Response): Promise<msdynmkt_consentvalidateformResponse> {
    const data = await response.json();
    return msdynmkt_consentvalidateformResponse.fromResponse(data);
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
