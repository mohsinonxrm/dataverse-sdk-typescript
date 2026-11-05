import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_FetchDiagnosticEntitiesAndCount action
 */
export interface msdyn_FetchDiagnosticEntitiesAndCountResponse {
  msdyn_Count: number;
}

/**
 * msdyn_FetchDiagnosticEntitiesAndCount action
 *
 * Unbound action
 */
export class msdyn_FetchDiagnosticEntitiesAndCountAction implements Executable<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
  constructor(
    public readonly msdyn_RunId: string,
    public readonly msdyn_Filter: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchDiagnosticEntitiesAndCount`;

    const body: Record<string, unknown> = {
      msdyn_RunId: this.msdyn_RunId,
      msdyn_Filter: this.msdyn_Filter,
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

  async parseResponse(response: Response): Promise<msdyn_FetchDiagnosticEntitiesAndCountResponse> {
    const data = await response.json();
    return data as msdyn_FetchDiagnosticEntitiesAndCountResponse;
  }
}
