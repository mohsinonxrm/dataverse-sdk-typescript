import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from AddComponentToSolutionAsync action
 */
export interface AddComponentToSolutionAsyncResponse {
  AsyncOperationId: string;
}

/**
 * AddComponentToSolutionAsync action
 *
 * Unbound action
 */
export class AddComponentToSolutionAsyncAction implements Executable<AddComponentToSolutionAsyncResponse> {
  constructor(
    public readonly logicalName: string,
    public readonly id: string,
    public readonly solutionUniqueName: string,
    public readonly addRequiredComponents: boolean,
    public readonly includeChildComponents: boolean,
    public readonly includeEntityMetadata: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddComponentToSolutionAsync`;

    const body: Record<string, unknown> = {
      LogicalName: this.logicalName,
      Id: this.id,
      SolutionUniqueName: this.solutionUniqueName,
      AddRequiredComponents: this.addRequiredComponents,
      IncludeChildComponents: this.includeChildComponents,
      IncludeEntityMetadata: this.includeEntityMetadata,
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

  async parseResponse(response: Response): Promise<AddComponentToSolutionAsyncResponse> {
    const data = await response.json();
    return data as AddComponentToSolutionAsyncResponse;
  }
}
