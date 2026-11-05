import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CreateAsyncJobToRevokeInheritedAccess request message
 *
 * Web API Action: CreateAsyncJobToRevokeInheritedAccess
 */
export class CreateAsyncJobToRevokeInheritedAccessRequest
  extends OrganizationRequest
  implements Executable<CreateAsyncJobToRevokeInheritedAccessResponse>
{
  constructor(public relationshipSchema: string) {
    super("CreateAsyncJobToRevokeInheritedAccess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAsyncJobToRevokeInheritedAccess`;

    const body: Record<string, unknown> = {
      RelationshipSchema: this.relationshipSchema,
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
