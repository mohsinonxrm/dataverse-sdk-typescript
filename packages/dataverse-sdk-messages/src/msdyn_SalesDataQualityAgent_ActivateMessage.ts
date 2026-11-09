import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_Activate message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ActivateRequestParameters {
  RequestJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_Activate request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_Activate
 */
export class msdyn_SalesDataQualityAgent_ActivateRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ActivateResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ActivateRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ActivateRequestParameters) {
    super("msdyn_SalesDataQualityAgent_Activate", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_Activate`;

    const body = requestBody({
      RequestJson: this.Parameters.RequestJson,
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

  async parseResponse(response: Response): Promise<msdyn_SalesDataQualityAgent_ActivateResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ActivateResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_Activate action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ActivateResult {
  "@odata.context"?: string;
  ResponseJson: string;
}

/**
 * msdyn_SalesDataQualityAgent_Activate response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_Activate action returns (see {@link msdyn_SalesDataQualityAgent_ActivateResult}).
 */
export class msdyn_SalesDataQualityAgent_ActivateResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ActivateResult) {
    super("msdyn_SalesDataQualityAgent_Activate");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ActivateResponse {
    return new msdyn_SalesDataQualityAgent_ActivateResponse(
      data as msdyn_SalesDataQualityAgent_ActivateResult
    );
  }
}
