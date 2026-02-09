import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getSalesSequenceExperimentStatus request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentStatus
 */
export class msdyn_getSalesSequenceExperimentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentStatusResponse>
{
  constructor(
    public msdyn_experimentKey: string,
    public msdyn_experimentVersionRecordId: string
  ) {
    super("msdyn_getSalesSequenceExperimentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentStatus`;

    const body: Record<string, unknown> = {
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
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

  async parseResponse(response: Response): Promise<msdyn_getSalesSequenceExperimentStatusResponse> {
    const data = await response.json();
    return msdyn_getSalesSequenceExperimentStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
    };
  }
}

/**
 * msdyn_getSalesSequenceExperimentStatus response message
 */
export class msdyn_getSalesSequenceExperimentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentStatusResponse) {
    super("msdyn_getSalesSequenceExperimentStatus");
  }

  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentStatusResponse {
    return new msdyn_getSalesSequenceExperimentStatusResponse((data as any).value);
  }
}
