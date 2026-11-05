import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CaseClassification request message
 *
 * Web API Action: msdyn_CaseClassification
 */
export class msdyn_CaseClassificationRequest
  extends OrganizationRequest
  implements Executable<msdyn_CaseClassificationResponse>
{
  constructor(public cSCopilotRequest4: string) {
    super("msdyn_CaseClassification");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CaseClassification`;

    const body: Record<string, unknown> = {
      CSCopilotRequest4: this.cSCopilotRequest4,
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

  async parseResponse(response: Response): Promise<msdyn_CaseClassificationResponse> {
    const data = await response.json();
    return msdyn_CaseClassificationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      CSCopilotRequest4: this.cSCopilotRequest4,
    };
  }
}

/**
 * msdyn_CaseClassification response message
 */
export class msdyn_CaseClassificationResponse extends OrganizationResponse {
  constructor(public result: msdyn_CaseClassificationResponse) {
    super("msdyn_CaseClassification");
  }

  static fromResponse(data: unknown): msdyn_CaseClassificationResponse {
    return new msdyn_CaseClassificationResponse((data as any).value);
  }
}
