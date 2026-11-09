import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the _SkillToUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type _SkillToUserResponse = void;

/**
 * Parameters of the _SkillToUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface _SkillToUserActionParameters {
  UpdatedBRC?: Record<string, unknown>[];
  DeletedBRC?: Record<string, unknown>[];
}

/**
 * _SkillToUser action
 *
 * Unbound action
 */
export class _SkillToUserAction implements Executable<_SkillToUserResponse> {
  constructor(public readonly parameters: _SkillToUserActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SkillToUser`;

    const body = requestBody({
      UpdatedBRC: this.parameters.UpdatedBRC,
      DeletedBRC: this.parameters.DeletedBRC,
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

  parseResponse(_response: Response): Promise<_SkillToUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
