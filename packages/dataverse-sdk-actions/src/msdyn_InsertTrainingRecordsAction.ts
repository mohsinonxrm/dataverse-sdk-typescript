import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InsertTrainingRecords action
 */
export interface msdyn_InsertTrainingRecordsResponse {
  recordsSkipped: number;
  recordsInserted: number;
}

/**
 * Parameters of the msdyn_InsertTrainingRecords action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InsertTrainingRecordsActionParameters {
  AttributesCount: number;
  Input: string;
  Config: string;
}

/**
 * msdyn_InsertTrainingRecords action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsitdimportconfig)
 *
 * The first argument is the id of the msdyn_ocsitdimportconfig record to call it on.
 */
export class msdyn_InsertTrainingRecordsAction implements Executable<msdyn_InsertTrainingRecordsResponse> {
  constructor(
    public readonly msdyn_ocsitdimportconfigId: string,
    public readonly parameters: msdyn_InsertTrainingRecordsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsitdimportconfigs(${this.msdyn_ocsitdimportconfigId})/Microsoft.Dynamics.CRM.msdyn_InsertTrainingRecords`;

    const body = requestBody({
      AttributesCount: this.parameters.AttributesCount,
      Input: this.parameters.Input,
      Config: this.parameters.Config,
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
    return (text ? JSON.parse(text) : {}) as msdyn_InsertTrainingRecordsResponse;
  }
}
