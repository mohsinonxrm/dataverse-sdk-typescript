import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SiteMapRepair message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SiteMapRepairRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SiteMapRepair request message
 *
 * Web API Action: msdyn_SiteMapRepair
 */
export class msdyn_SiteMapRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_SiteMapRepairResponse>
{
  declare readonly Parameters: Readonly<msdyn_SiteMapRepairRequestParameters>;

  constructor(parameters: msdyn_SiteMapRepairRequestParameters = {}) {
    super("msdyn_SiteMapRepair", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapRepair`;

    const body = requestBody({
      AnalysisResult: this.Parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_SiteMapRepairResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SiteMapRepairResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SiteMapRepair action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SiteMapRepairResult {
  "@odata.context"?: string;
  HelpLink: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * msdyn_SiteMapRepair response message
 *
 * `result` is the value the msdyn_SiteMapRepair action returns (see {@link msdyn_SiteMapRepairResult}).
 */
export class msdyn_SiteMapRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapRepairResult) {
    super("msdyn_SiteMapRepair");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SiteMapRepairResponse {
    return new msdyn_SiteMapRepairResponse(data as msdyn_SiteMapRepairResult);
  }
}
