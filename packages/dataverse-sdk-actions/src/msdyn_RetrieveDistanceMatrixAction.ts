import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RetrieveDistanceMatrix action
 */
export interface msdyn_RetrieveDistanceMatrixResponse {
  ExceptionMessage: string;
}

/**
 * msdyn_RetrieveDistanceMatrix action
 *
 * Unbound action
 */
export class msdyn_RetrieveDistanceMatrixAction implements Executable<msdyn_RetrieveDistanceMatrixResponse> {
  constructor(
    public readonly version: string,
    public readonly sources: Record<string, unknown>[],
    public readonly targets: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveDistanceMatrix`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Sources: this.sources,
      Targets: this.targets,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveDistanceMatrixResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveDistanceMatrixResponse;
  }
}
