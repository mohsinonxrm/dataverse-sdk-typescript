import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from _SkillToUser action
 */
export interface _SkillToUserResponse {
  // No content returned
}

/**
 * _SkillToUser action
 *
 * Unbound action
 */
export class _SkillToUserAction implements Executable<_SkillToUserResponse> {
  constructor(
    public readonly updatedBRC?: Record<string, unknown>[],
    public readonly deletedBRC?: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/_SkillToUser`;

    const body: Record<string, unknown> = {
      UpdatedBRC: this.updatedBRC,
      DeletedBRC: this.deletedBRC,
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

  async parseResponse(response: Response): Promise<_SkillToUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
