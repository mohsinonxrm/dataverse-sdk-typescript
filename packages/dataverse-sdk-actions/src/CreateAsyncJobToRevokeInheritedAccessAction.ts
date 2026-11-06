import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CreateAsyncJobToRevokeInheritedAccess action
 */
export interface CreateAsyncJobToRevokeInheritedAccessResponse {
  // No content returned
}

/**
 * Parameters of the CreateAsyncJobToRevokeInheritedAccess action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateAsyncJobToRevokeInheritedAccessActionParameters {
  RelationshipSchema: string;
}

/**
 * CreateAsyncJobToRevokeInheritedAccess action
 *
 * Unbound action
 */
export class CreateAsyncJobToRevokeInheritedAccessAction implements Executable<CreateAsyncJobToRevokeInheritedAccessResponse> {
  constructor(public readonly parameters: CreateAsyncJobToRevokeInheritedAccessActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateAsyncJobToRevokeInheritedAccess`;

    const body = requestBody({
      RelationshipSchema: this.parameters.RelationshipSchema,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CreateAsyncJobToRevokeInheritedAccessResponse;
  }
}
