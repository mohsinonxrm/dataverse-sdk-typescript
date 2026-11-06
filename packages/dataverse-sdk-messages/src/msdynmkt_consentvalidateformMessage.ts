import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_consentvalidateform message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_consentvalidateformRequestParameters {
  complianceProfileId?: string;
  formBusinessUnitId?: string;
  isDoubleOptInForciblyDisabled?: boolean;
  msdynmkt_editorname: string;
  validationType?: number;
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
      complianceProfileId: this.Parameters.complianceProfileId,
      formBusinessUnitId: this.Parameters.formBusinessUnitId,
      isDoubleOptInForciblyDisabled: this.Parameters.isDoubleOptInForciblyDisabled,
      msdynmkt_editorname: this.Parameters.msdynmkt_editorname,
      validationType: this.Parameters.validationType,
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
    // The body is the complex value, with its @odata.context
    return msdynmkt_consentvalidateformResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_consentvalidateform action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_consentvalidateformResult {
  "@odata.context"?: string;
  msdynmkt_validationresponse: string;
}

/**
 * msdynmkt_consentvalidateform response message
 *
 * `result` is the value the msdynmkt_consentvalidateform action returns (see {@link msdynmkt_consentvalidateformResult}).
 */
export class msdynmkt_consentvalidateformResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_consentvalidateformResult) {
    super("msdynmkt_consentvalidateform");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_consentvalidateformResponse {
    return new msdynmkt_consentvalidateformResponse(data as msdynmkt_consentvalidateformResult);
  }
}
