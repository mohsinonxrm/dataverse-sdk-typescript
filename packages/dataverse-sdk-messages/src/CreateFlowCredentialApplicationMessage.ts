import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CreateFlowCredentialApplication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowCredentialApplicationRequestParameters {
  description?: string;
  certificate: string;
  applicationId: string;
  password?: string;
  sharingtype?: string;
}

/**
 * CreateFlowCredentialApplication request message
 *
 * Web API Action: CreateFlowCredentialApplication
 *
 * The first argument is the id of the flowmachinegroup record to call it on.
 */
export class CreateFlowCredentialApplicationRequest
  extends OrganizationRequest
  implements Executable<CreateFlowCredentialApplicationResponse>
{
  declare readonly Parameters: Readonly<CreateFlowCredentialApplicationRequestParameters>;

  constructor(
    public flowmachinegroupId: string,
    parameters: CreateFlowCredentialApplicationRequestParameters
  ) {
    super("CreateFlowCredentialApplication", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${odataLiteral.guid(this.flowmachinegroupId)})/Microsoft.Dynamics.CRM.CreateFlowCredentialApplication`;

    const body = requestBody({
      description: this.Parameters.description,
      certificate: this.Parameters.certificate,
      applicationId: this.Parameters.applicationId,
      password: this.Parameters.password,
      sharingtype: this.Parameters.sharingtype,
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

  async parseResponse(response: Response): Promise<CreateFlowCredentialApplicationResponse> {
    // The body is the complex value, with its @odata.context
    return CreateFlowCredentialApplicationResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateFlowCredentialApplication action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateFlowCredentialApplicationResult {
  "@odata.context"?: string;
  flowCredentialApplicationId: string;
}

/**
 * CreateFlowCredentialApplication response message
 *
 * `result` is the value the CreateFlowCredentialApplication action returns (see {@link CreateFlowCredentialApplicationResult}).
 */
export class CreateFlowCredentialApplicationResponse extends OrganizationResponse {
  constructor(public result: CreateFlowCredentialApplicationResult) {
    super("CreateFlowCredentialApplication");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateFlowCredentialApplicationResponse {
    return new CreateFlowCredentialApplicationResponse(
      data as CreateFlowCredentialApplicationResult
    );
  }
}
