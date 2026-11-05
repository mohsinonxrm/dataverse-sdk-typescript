import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateNPSUserRating action
 */
export interface CreateNPSUserRatingResponse {
  // No content returned
}

/**
 * CreateNPSUserRating action
 *
 * Unbound action
 */
export class CreateNPSUserRatingAction implements Executable<CreateNPSUserRatingResponse> {
  constructor(
    public readonly score: number,
    public readonly comment: string,
    public readonly appModuleId: string,
    public readonly browser: string,
    public readonly device: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateNPSUserRating`;

    const body: Record<string, unknown> = {
      Score: this.score,
      Comment: this.comment,
      AppModuleId: this.appModuleId,
      Browser: this.browser,
      Device: this.device,
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

  async parseResponse(response: Response): Promise<CreateNPSUserRatingResponse> {
    // No return value (204 No Content)
    return {};
  }
}
