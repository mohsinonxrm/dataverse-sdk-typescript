import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateAsyncJobToRevokeInheritedAccess action
 */
export interface CreateAsyncJobToRevokeInheritedAccessResponse {
  // No content returned
}

/**
 * CreateAsyncJobToRevokeInheritedAccess action
 *
 * Unbound action
 */
export class CreateAsyncJobToRevokeInheritedAccessAction implements Executable<CreateAsyncJobToRevokeInheritedAccessResponse> {
  constructor(public readonly relationshipSchema: string) {}

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
    return {};
  }
}
