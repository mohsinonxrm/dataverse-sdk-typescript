import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InsertTrainingRecordsResponse as msdyn_InsertTrainingRecordsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_InsertTrainingRecords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InsertTrainingRecordsRequestParameters {
  AttributesCount: number;
  Input: string;
  Config: string;
}

/**
 * msdyn_InsertTrainingRecords request message
 *
 * Web API Action: msdyn_InsertTrainingRecords
 *
 * The first argument is the id of the msdyn_ocsitdimportconfig record to call it on.
 */
export class msdyn_InsertTrainingRecordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_InsertTrainingRecordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_InsertTrainingRecordsRequestParameters>;

  constructor(
    public msdyn_ocsitdimportconfigId: string,
    parameters: msdyn_InsertTrainingRecordsRequestParameters
  ) {
    super("msdyn_InsertTrainingRecords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsitdimportconfigs(${this.msdyn_ocsitdimportconfigId})/Microsoft.Dynamics.CRM.msdyn_InsertTrainingRecords`;

    const body = requestBody({
      AttributesCount: this.Parameters.AttributesCount,
      Input: this.Parameters.Input,
      Config: this.Parameters.Config,
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

  async parseResponse(response: Response): Promise<msdyn_InsertTrainingRecordsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_InsertTrainingRecordsResponse.fromResponse(text ? JSON.parse(text) : {});
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
