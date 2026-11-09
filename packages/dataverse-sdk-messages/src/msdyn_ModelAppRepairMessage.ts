import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_ModelAppRepair message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ModelAppRepairRequestParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ModelAppRepair request message
 *
 * Web API Action: msdyn_ModelAppRepair
 */
export class msdyn_ModelAppRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_ModelAppRepairResponse>
{
  declare readonly Parameters: Readonly<msdyn_ModelAppRepairRequestParameters>;

  constructor(parameters: msdyn_ModelAppRepairRequestParameters = {}) {
    super("msdyn_ModelAppRepair", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ModelAppRepairResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ModelAppRepair action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ModelAppRepairResult {
  "@odata.context"?: string;
  HelpLink: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * msdyn_ModelAppRepair response message
 *
 * `result` is the value the msdyn_ModelAppRepair action returns (see {@link msdyn_ModelAppRepairResult}).
 */
export class msdyn_ModelAppRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppRepairResult) {
    super("msdyn_ModelAppRepair");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ModelAppRepairResponse {
    return new msdyn_ModelAppRepairResponse(data as msdyn_ModelAppRepairResult);
  }
}
