import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_InsertTrainingRecordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InsertTrainingRecords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InsertTrainingRecordsResult {
  "@odata.context"?: string;
  recordsInserted: number;
  recordsSkipped: number;
}

/**
 * msdyn_InsertTrainingRecords response message
 *
 * `result` is the value the msdyn_InsertTrainingRecords action returns (see {@link msdyn_InsertTrainingRecordsResult}).
 */
export class msdyn_InsertTrainingRecordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_InsertTrainingRecordsResult) {
    super("msdyn_InsertTrainingRecords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InsertTrainingRecordsResponse {
    return new msdyn_InsertTrainingRecordsResponse(data as msdyn_InsertTrainingRecordsResult);
  }
}
