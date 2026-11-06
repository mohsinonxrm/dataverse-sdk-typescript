import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  appmodule,
  msdyn_ModelAppDiagnosisResponse as msdyn_ModelAppDiagnosisResponseData,
} from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ModelAppDiagnosisResponse.fromResponse({});
    return msdyn_ModelAppDiagnosisResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ModelAppDiagnosis response message
 */
export class msdyn_ModelAppDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppDiagnosisResponseData) {
    super("msdyn_ModelAppDiagnosis");
  }

  static fromResponse(data: unknown): msdyn_ModelAppDiagnosisResponse {
    return new msdyn_ModelAppDiagnosisResponse(
      responseObject<msdyn_ModelAppDiagnosisResponseData>(data)
    );
  }
}
