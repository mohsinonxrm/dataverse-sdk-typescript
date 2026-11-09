import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SalesDataQualityAgent_ProcessRCSInput message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters {
  msdyn_RCSTrigger: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SalesDataQualityAgent_ProcessRCSInput request message
 *
 * Web API Action: msdyn_SalesDataQualityAgent_ProcessRCSInput
 */
export class msdyn_SalesDataQualityAgent_ProcessRCSInputRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesDataQualityAgent_ProcessRCSInputResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters>;

  constructor(parameters: msdyn_SalesDataQualityAgent_ProcessRCSInputRequestParameters) {
    super("msdyn_SalesDataQualityAgent_ProcessRCSInput", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesDataQualityAgent_ProcessRCSInput`;

    const body = requestBody({
      msdyn_RCSTrigger: this.Parameters.msdyn_RCSTrigger,
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
  ): Promise<msdyn_SalesDataQualityAgent_ProcessRCSInputResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SalesDataQualityAgent_ProcessRCSInputResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SalesDataQualityAgent_ProcessRCSInput action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesDataQualityAgent_ProcessRCSInputResult {
  "@odata.context"?: string;
  msdyn_Emails: string;
  msdyn_Opportunities: string;
  msdyn_ShouldUseStaticRules: boolean;
}

/**
 * msdyn_SalesDataQualityAgent_ProcessRCSInput response message
 *
 * `result` is the value the msdyn_SalesDataQualityAgent_ProcessRCSInput action returns (see {@link msdyn_SalesDataQualityAgent_ProcessRCSInputResult}).
 */
export class msdyn_SalesDataQualityAgent_ProcessRCSInputResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesDataQualityAgent_ProcessRCSInputResult) {
    super("msdyn_SalesDataQualityAgent_ProcessRCSInput");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SalesDataQualityAgent_ProcessRCSInputResponse {
    return new msdyn_SalesDataQualityAgent_ProcessRCSInputResponse(
      data as msdyn_SalesDataQualityAgent_ProcessRCSInputResult
    );
  }
}
