import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InsertTrainingRecords action
 */
export interface msdyn_InsertTrainingRecordsResponse {
  recordsSkipped: number;
  recordsInserted: number;
}

/**
 * msdyn_InsertTrainingRecords action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_ocsitdimportconfig)
 */
export class msdyn_InsertTrainingRecordsAction implements Executable<msdyn_InsertTrainingRecordsResponse> {
  constructor(
    public readonly msdyn_ocsitdimportconfigId: string,
    public readonly attributesCount: number,
    public readonly input: string,
    public readonly config: string
  ) {}

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
    return data as msdyn_InsertTrainingRecordsResponse;
  }
}
