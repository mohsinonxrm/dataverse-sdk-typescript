import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { solutioncomponent } from "./types/index.js";

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
    // The body is the complex value, with its @odata.context
    return RemoveSolutionComponentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RemoveSolutionComponent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RemoveSolutionComponentResult {
  "@odata.context"?: string;
  id: string;
}

/**
 * RemoveSolutionComponent response message
 *
 * `result` is the value the RemoveSolutionComponent action returns (see {@link RemoveSolutionComponentResult}).
 */
export class RemoveSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: RemoveSolutionComponentResult) {
    super("RemoveSolutionComponent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RemoveSolutionComponentResponse {
    return new RemoveSolutionComponentResponse(data as RemoveSolutionComponentResult);
  }
}
