import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_InsertTrainingRecordsResponse as msdyn_InsertTrainingRecordsResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_InsertTrainingRecordsResponse> {
    const data = await response.json();
    return msdyn_InsertTrainingRecordsResponse.fromResponse(data);
  }
}

/**
 * msdyn_InsertTrainingRecords response message
 */
export class msdyn_InsertTrainingRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_InsertTrainingRecordsResponseData) {
    super("msdyn_InsertTrainingRecords");
  }

  static fromResponse(data: unknown): msdyn_InsertTrainingRecordsResponse {
    return new msdyn_InsertTrainingRecordsResponse(
      responseObject<msdyn_InsertTrainingRecordsResponseData>(data)
    );
  }
}
