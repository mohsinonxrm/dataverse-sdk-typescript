import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckForRemovedFormLibraries action
 */
export interface msdyn_CheckForRemovedFormLibrariesResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  HelpLink: string;
}

/**
 * msdyn_CheckForRemovedFormLibraries action
 *
 * Unbound action
 */
export class msdyn_CheckForRemovedFormLibrariesAction implements Executable<msdyn_CheckForRemovedFormLibrariesResponse> {
  constructor(
    public readonly solutionId: string,
    public readonly excludeFormIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForRemovedFormLibraries`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
      ExcludeFormIds: this.excludeFormIds,
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

  async parseResponse(response: Response): Promise<msdyn_CheckForRemovedFormLibrariesResponse> {
    const data = await response.json();
    return data as msdyn_CheckForRemovedFormLibrariesResponse;
  }
}
