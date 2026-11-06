import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the AddSolutionComponent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AddSolutionComponentRequestParameters {
  ComponentId: string;
  ComponentType: number;
  SolutionUniqueName: string;
  AddRequiredComponents: boolean;
  DoNotIncludeSubcomponents?: boolean;
  IncludedComponentSettingsValues?: string[];
}

/**
 * AddSolutionComponent request message
 *
 * Web API Action: AddSolutionComponent
 */
export class AddSolutionComponentRequest
  extends OrganizationRequest
  implements Executable<AddSolutionComponentResponse>
{
  declare readonly Parameters: Readonly<AddSolutionComponentRequestParameters>;

  constructor(parameters: AddSolutionComponentRequestParameters) {
    super("AddSolutionComponent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AddSolutionComponent`;

    const body = requestBody({
      ComponentId: this.Parameters.ComponentId,
      ComponentType: this.Parameters.ComponentType,
      SolutionUniqueName: this.Parameters.SolutionUniqueName,
      AddRequiredComponents: this.Parameters.AddRequiredComponents,
      DoNotIncludeSubcomponents: this.Parameters.DoNotIncludeSubcomponents,
      IncludedComponentSettingsValues: this.Parameters.IncludedComponentSettingsValues,
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

  async parseResponse(response: Response): Promise<AddSolutionComponentResponse> {
    // The body is the complex value, with its @odata.context
    return AddSolutionComponentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the AddSolutionComponent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface AddSolutionComponentResult {
  "@odata.context"?: string;
  id: string;
}

/**
 * AddSolutionComponent response message
 *
 * `result` is the value the AddSolutionComponent action returns (see {@link AddSolutionComponentResult}).
 */
export class AddSolutionComponentResponse extends OrganizationResponse {
  constructor(public result: AddSolutionComponentResult) {
    super("AddSolutionComponent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): AddSolutionComponentResponse {
    return new AddSolutionComponentResponse(data as AddSolutionComponentResult);
  }
}
