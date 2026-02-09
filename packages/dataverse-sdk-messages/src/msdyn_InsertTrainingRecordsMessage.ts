import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InsertTrainingRecords request message
 *
 * Web API Action: msdyn_InsertTrainingRecords
 */
export class msdyn_InsertTrainingRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_InsertTrainingRecordsResponse>
{
  constructor(
    public msdyn_ocsitdimportconfigId: string,
    public attributesCount: number,
    public input: string,
    public config: string
  ) {
    super("msdyn_InsertTrainingRecords");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsitdimportconfigs(${this.msdyn_ocsitdimportconfigId})/Microsoft.Dynamics.CRM.msdyn_InsertTrainingRecords`;

    const body: Record<string, unknown> = {
      AttributesCount: this.attributesCount,
      Input: this.input,
      Config: this.config,
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

  async parseResponse(response: Response): Promise<msdyn_InsertTrainingRecordsResponse> {
    const data = await response.json();
    return msdyn_InsertTrainingRecordsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_ocsitdimportconfigId,
      AttributesCount: this.attributesCount,
      Input: this.input,
      Config: this.config,
    };
  }
}

/**
 * msdyn_InsertTrainingRecords response message
 */
export class msdyn_InsertTrainingRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_InsertTrainingRecordsResponse) {
    super("msdyn_InsertTrainingRecords");
  }

  static fromResponse(data: unknown): msdyn_InsertTrainingRecordsResponse {
    return new msdyn_InsertTrainingRecordsResponse((data as any).value);
  }
}
