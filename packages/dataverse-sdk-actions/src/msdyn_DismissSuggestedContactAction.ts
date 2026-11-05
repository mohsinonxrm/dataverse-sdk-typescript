import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_DismissSuggestedContact action
 */
export interface msdyn_DismissSuggestedContactResponse {
  // No content returned
}

/**
 * msdyn_DismissSuggestedContact action
 *
 * Unbound action
 */
export class msdyn_DismissSuggestedContactAction implements Executable<msdyn_DismissSuggestedContactResponse> {
  constructor(
    public readonly suggestedContactId: string,
    public readonly dismissContact: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedContact`;

    const body: Record<string, unknown> = {
      SuggestedContactId: this.suggestedContactId,
      DismissContact: this.dismissContact,
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

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedContactResponse> {
    // No return value (204 No Content)
    return {};
  }
}
