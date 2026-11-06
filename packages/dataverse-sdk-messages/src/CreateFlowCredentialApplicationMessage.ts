import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CreateFlowCredentialApplicationResponse as CreateFlowCredentialApplicationResponseData } from "./types/index.js";

/**
 * Parameters of the CreateFlowCredentialApplication message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowCredentialApplicationRequestParameters {
  sharingtype?: string;
  password?: string;
  description?: string;
  certificate: string;
  applicationId: string;
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
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.CreateFlowCredentialApplication`;

    const body = requestBody({
      sharingtype: this.Parameters.sharingtype,
      password: this.Parameters.password,
      description: this.Parameters.description,
      certificate: this.Parameters.certificate,
      applicationId: this.Parameters.applicationId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return CreateFlowCredentialApplicationResponse.fromResponse({});
    return CreateFlowCredentialApplicationResponse.fromResponse(await response.json());
  }
}

/**
 * CreateFlowCredentialApplication response message
 */
export class CreateFlowCredentialApplicationResponse extends OrganizationResponse {
  constructor(public result: CreateFlowCredentialApplicationResponseData) {
    super("CreateFlowCredentialApplication");
  }

  static fromResponse(data: unknown): CreateFlowCredentialApplicationResponse {
    return new CreateFlowCredentialApplicationResponse(
      responseObject<CreateFlowCredentialApplicationResponseData>(data)
    );
  }
}
