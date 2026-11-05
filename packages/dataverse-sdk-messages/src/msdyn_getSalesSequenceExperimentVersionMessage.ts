import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_getSalesSequenceExperimentVersion request message
 *
 * Web API Action: msdyn_getSalesSequenceExperimentVersion
 */
export class msdyn_getSalesSequenceExperimentVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_getSalesSequenceExperimentVersionResponse>
{
  constructor(
    public msdyn_experimentKey: string,
    public msdyn_customerId: string,
    public msdyn_versionATraffic: number,
    public msdyn_experimentVersionRecordId: string
  ) {
    super("msdyn_getSalesSequenceExperimentVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getSalesSequenceExperimentVersion`;

    const body: Record<string, unknown> = {
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_customerId: this.msdyn_customerId,
      msdyn_versionATraffic: this.msdyn_versionATraffic,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_getSalesSequenceExperimentVersionResponse> {
    const data = await response.json();
    return msdyn_getSalesSequenceExperimentVersionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_experimentKey: this.msdyn_experimentKey,
      msdyn_customerId: this.msdyn_customerId,
      msdyn_versionATraffic: this.msdyn_versionATraffic,
      msdyn_experimentVersionRecordId: this.msdyn_experimentVersionRecordId,
    };
  }
}

/**
 * msdyn_getSalesSequenceExperimentVersion response message
 */
export class msdyn_getSalesSequenceExperimentVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_getSalesSequenceExperimentVersionResponse) {
    super("msdyn_getSalesSequenceExperimentVersion");
  }

  static fromResponse(data: unknown): msdyn_getSalesSequenceExperimentVersionResponse {
    return new msdyn_getSalesSequenceExperimentVersionResponse((data as any).value);
  }
}
