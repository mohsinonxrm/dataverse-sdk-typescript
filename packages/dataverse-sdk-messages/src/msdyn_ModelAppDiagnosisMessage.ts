import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  appmodule,
  msdyn_ModelAppDiagnosisResponse as msdyn_ModelAppDiagnosisResponseData,
} from "./types/index.js";

/**
 * msdyn_ModelAppDiagnosis request message
 *
 * Web API Action: msdyn_ModelAppDiagnosis
 */
export class msdyn_ModelAppDiagnosisRequest
  extends OrganizationRequest
  implements Executable<msdyn_ModelAppDiagnosisResponse>
{
  constructor(
    public issueType: string,
    public componentInstance: EntityReference | EntityPayload<appmodule>
  ) {
    super("msdyn_ModelAppDiagnosis");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppDiagnosis`;

    const body: Record<string, unknown> = {
      IssueType: this.issueType,
      ComponentInstance: this.componentInstance,
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

  async parseResponse(response: Response): Promise<msdyn_ModelAppDiagnosisResponse> {
    const data = await response.json();
    return msdyn_ModelAppDiagnosisResponse.fromResponse(data);
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
