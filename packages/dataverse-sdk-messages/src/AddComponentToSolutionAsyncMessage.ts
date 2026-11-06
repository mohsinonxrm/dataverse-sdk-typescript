import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { AddComponentToSolutionAsyncResponse as AddComponentToSolutionAsyncResponseData } from "./types/index.js";

/**
 * AddComponentToSolutionAsync request message
 *
 * Web API Action: AddComponentToSolutionAsync
 */
export class AddComponentToSolutionAsyncRequest
  extends OrganizationRequest
  implements Executable<AddComponentToSolutionAsyncResponse>
{
  constructor(
    public logicalName: string,
    public id: string,
    public solutionUniqueName: string,
    public addRequiredComponents: boolean,
    public includeChildComponents?: boolean,
    public includeEntityMetadata?: boolean
  ) {
    super("AddComponentToSolutionAsync");
  }

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
    return AddComponentToSolutionAsyncResponse.fromResponse(data);
  }
}

/**
 * AddComponentToSolutionAsync response message
 */
export class AddComponentToSolutionAsyncResponse extends OrganizationResponse {
  constructor(public result: AddComponentToSolutionAsyncResponseData) {
    super("AddComponentToSolutionAsync");
  }

  static fromResponse(data: unknown): AddComponentToSolutionAsyncResponse {
    return new AddComponentToSolutionAsyncResponse(
      responseObject<AddComponentToSolutionAsyncResponseData>(data)
    );
  }
}
