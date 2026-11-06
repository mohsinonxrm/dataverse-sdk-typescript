import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CreateAsyncJobToRevokeInheritedAccess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateAsyncJobToRevokeInheritedAccessRequestParameters {
  RelationshipSchema: string;
}

/**
 * CreateAsyncJobToRevokeInheritedAccess request message
 *
 * Web API Action: CreateAsyncJobToRevokeInheritedAccess
 */
export class CreateAsyncJobToRevokeInheritedAccessRequest
  extends OrganizationRequest
  implements Executable<CreateAsyncJobToRevokeInheritedAccessResponse>
{
  declare readonly Parameters: Readonly<CreateAsyncJobToRevokeInheritedAccessRequestParameters>;

  constructor(parameters: CreateAsyncJobToRevokeInheritedAccessRequestParameters) {
    super("CreateAsyncJobToRevokeInheritedAccess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAsyncJobToRevokeInheritedAccess`;

    const body = requestBody({
      RelationshipSchema: this.Parameters.RelationshipSchema,
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

  async parseResponse(response: Response): Promise<CreateAsyncJobToRevokeInheritedAccessResponse> {
    // No return value (204 No Content)
    return new CreateAsyncJobToRevokeInheritedAccessResponse();
  }
}

/**
 * CreateAsyncJobToRevokeInheritedAccess response message
 */
export class CreateAsyncJobToRevokeInheritedAccessResponse extends OrganizationResponse {
  constructor() {
    super("CreateAsyncJobToRevokeInheritedAccess");
  }

  static fromResponse(_data: unknown): CreateAsyncJobToRevokeInheritedAccessResponse {
    return new CreateAsyncJobToRevokeInheritedAccessResponse();
  }
}
