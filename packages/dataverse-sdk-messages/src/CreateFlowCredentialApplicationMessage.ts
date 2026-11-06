import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CreateFlowCredentialApplicationResponse as CreateFlowCredentialApplicationResponseData } from "./types/index.js";

/**
 * CreateFlowCredentialApplication request message
 *
 * Web API Action: CreateFlowCredentialApplication
 */
export class CreateFlowCredentialApplicationRequest
  extends OrganizationRequest
  implements Executable<CreateFlowCredentialApplicationResponse>
{
  constructor(
    public flowmachinegroupId: string,
    public sharingtype: string | undefined,
    public password: string | undefined,
    public description: string | undefined,
    public certificate: string,
    public applicationId: string
  ) {
    super("CreateFlowCredentialApplication");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinegroups(${this.flowmachinegroupId})/Microsoft.Dynamics.CRM.CreateFlowCredentialApplication`;

    const body: Record<string, unknown> = {
      sharingtype: this.sharingtype,
      password: this.password,
      description: this.description,
      certificate: this.certificate,
      applicationId: this.applicationId,
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

  async parseResponse(response: Response): Promise<CreateFlowCredentialApplicationResponse> {
    const data = await response.json();
    return CreateFlowCredentialApplicationResponse.fromResponse(data);
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
