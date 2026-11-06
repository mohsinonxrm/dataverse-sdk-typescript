import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { appmodule } from "./types/index.js";

/**
 * Parameters of the msdyn_ModelAppDiagnosis message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ModelAppDiagnosisRequestParameters {
  IssueType: string;
  ComponentInstance: EntityReference | EntityPayload<appmodule>;
}

/**
 * msdyn_ModelAppDiagnosis request message
 *
 * Web API Action: msdyn_ModelAppDiagnosis
 */
export class msdyn_ModelAppDiagnosisRequest
  extends OrganizationRequest
  implements Executable<msdyn_ModelAppDiagnosisResponse>
{
  declare readonly Parameters: Readonly<msdyn_ModelAppDiagnosisRequestParameters>;

  constructor(parameters: msdyn_ModelAppDiagnosisRequestParameters) {
    super("msdyn_ModelAppDiagnosis", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppDiagnosis`;

    const body = requestBody({
      IssueType: this.Parameters.IssueType,
      ComponentInstance: this.Parameters.ComponentInstance,
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

  async parseResponse(response: Response): Promise<msdyn_ModelAppDiagnosisResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_ModelAppDiagnosisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ModelAppDiagnosis action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ModelAppDiagnosisResult {
  "@odata.context"?: string;
  HelpLink: string;
  Message: string;
  RepairIssueType: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_ModelAppDiagnosis response message
 *
 * `result` is the value the msdyn_ModelAppDiagnosis action returns (see {@link msdyn_ModelAppDiagnosisResult}).
 */
export class msdyn_ModelAppDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppDiagnosisResult) {
    super("msdyn_ModelAppDiagnosis");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ModelAppDiagnosisResponse {
    return new msdyn_ModelAppDiagnosisResponse(data as msdyn_ModelAppDiagnosisResult);
  }
}
