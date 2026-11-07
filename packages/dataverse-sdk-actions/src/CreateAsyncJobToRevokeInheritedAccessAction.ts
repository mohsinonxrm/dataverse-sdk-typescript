import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CreateAsyncJobToRevokeInheritedAccess action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CreateAsyncJobToRevokeInheritedAccessResponse = void;

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

  parseResponse(_response: Response): Promise<CreateAsyncJobToRevokeInheritedAccessResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
