import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  RemoveSolutionComponentResponse as RemoveSolutionComponentResponseData,
  solutioncomponent,
} from "./types/index.js";

/**
 * Parameters of the RemoveSolutionComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveSolutionComponentRequestParameters {
  SolutionComponent: EntityReference | EntityPayload<solutioncomponent>;
  ComponentType: number;
  SolutionUniqueName: string;
}

/**
 * RemoveSolutionComponent request message
 *
 * Web API Action: RemoveSolutionComponent
 */
export class RemoveSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<RemoveSolutionComponentResponse>
{
  declare readonly Parameters: Readonly<RemoveSolutionComponentRequestParameters>;

  constructor(parameters: RemoveSolutionComponentRequestParameters) {
    super("RemoveSolutionComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveSolutionComponent`;

    const body = requestBody({
      SolutionComponent: this.Parameters.SolutionComponent,
      ComponentType: this.Parameters.ComponentType,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
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

  async parseResponse(response: Response): Promise<RemoveSolutionComponentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return RemoveSolutionComponentResponse.fromResponse({});
    return RemoveSolutionComponentResponse.fromResponse(await response.json());
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
