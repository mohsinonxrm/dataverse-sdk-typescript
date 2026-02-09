import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { solutioncomponent } from "./types/index.js";

/**
 * RemoveSolutionComponent request message
 *
 * Web API Action: RemoveSolutionComponent
 */
export class RemoveSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<RemoveSolutionComponentResponse>
{
  constructor(
    public solutionComponent: solutioncomponent,
    public componentType: number,
    public solutionUniqueName: string
  ) {
    super("RemoveSolutionComponent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveSolutionComponent`;

    const body: Record<string, unknown> = {
      SolutionComponent: this.solutionComponent,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
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

  async parseResponse(response: Response): Promise<RemoveSolutionComponentResponse> {
    const data = await response.json();
    return RemoveSolutionComponentResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionComponent: this.solutionComponent,
      ComponentType: this.componentType,
      SolutionUniqueName: this.solutionUniqueName,
    };
  }
}

/**
 * RemoveSolutionComponent response message
 */
export class RemoveSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: RemoveSolutionComponentResponse) {
    super("RemoveSolutionComponent");
  }

  static fromResponse(data: unknown): RemoveSolutionComponentResponse {
    return new RemoveSolutionComponentResponse((data as any).value);
  }
}
