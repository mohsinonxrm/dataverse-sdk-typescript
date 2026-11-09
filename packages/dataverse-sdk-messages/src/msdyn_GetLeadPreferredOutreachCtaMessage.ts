import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetLeadPreferredOutreachCta message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetLeadPreferredOutreachCtaRequestParameters {
  msdyn_leadid: string;
}

/**
 * msdyn_GetLeadPreferredOutreachCta request message
 *
 * Web API Action: msdyn_GetLeadPreferredOutreachCta
 */
export class msdyn_GetLeadPreferredOutreachCtaRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetLeadPreferredOutreachCtaResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetLeadPreferredOutreachCtaRequestParameters>;

  constructor(parameters: msdyn_GetLeadPreferredOutreachCtaRequestParameters) {
    super("msdyn_GetLeadPreferredOutreachCta", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetLeadPreferredOutreachCta`;

    const body = requestBody({
      msdyn_leadid: this.Parameters.msdyn_leadid,
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

  async parseResponse(response: Response): Promise<msdyn_GetLeadPreferredOutreachCtaResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetLeadPreferredOutreachCtaResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetLeadPreferredOutreachCta action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetLeadPreferredOutreachCtaResult {
  "@odata.context"?: string;
  msdyn_attributesforcta: string;
  msdyn_leadpreferredoutreachcta: number;
}

/**
 * msdyn_GetLeadPreferredOutreachCta response message
 *
 * `result` is the value the msdyn_GetLeadPreferredOutreachCta action returns (see {@link msdyn_GetLeadPreferredOutreachCtaResult}).
 */
export class msdyn_GetLeadPreferredOutreachCtaResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetLeadPreferredOutreachCtaResult) {
    super("msdyn_GetLeadPreferredOutreachCta");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetLeadPreferredOutreachCtaResponse {
    return new msdyn_GetLeadPreferredOutreachCtaResponse(
      data as msdyn_GetLeadPreferredOutreachCtaResult
    );
  }
}
