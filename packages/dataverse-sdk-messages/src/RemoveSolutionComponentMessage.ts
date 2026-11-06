import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type {
  RemoveSolutionComponentResponse as RemoveSolutionComponentResponseData,
  solutioncomponent,
} from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RemoveSolutionComponentResponse> {
    const data = await response.json();
    return RemoveSolutionComponentResponse.fromResponse(data);
  }
}

/**
 * RemoveSolutionComponent response message
 */
export class RemoveSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: RemoveSolutionComponentResponseData) {
    super("RemoveSolutionComponent");
  }

  static fromResponse(data: unknown): RemoveSolutionComponentResponse {
    return new RemoveSolutionComponentResponse(
      responseObject<RemoveSolutionComponentResponseData>(data)
    );
  }
}
