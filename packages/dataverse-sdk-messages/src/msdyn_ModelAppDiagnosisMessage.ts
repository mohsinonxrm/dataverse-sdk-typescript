import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appmodule } from "./types/index.js";

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
    public componentInstance: appmodule
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ModelAppDiagnosisResponse> {
    const data = await response.json();
    return msdyn_ModelAppDiagnosisResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IssueType: this.issueType,
      ComponentInstance: this.componentInstance,
    };
  }
}

/**
 * msdyn_ModelAppDiagnosis response message
 */
export class msdyn_ModelAppDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppDiagnosisResponse) {
    super("msdyn_ModelAppDiagnosis");
  }

  static fromResponse(data: unknown): msdyn_ModelAppDiagnosisResponse {
    return new msdyn_ModelAppDiagnosisResponse((data as any).value);
  }
}
