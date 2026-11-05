import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_EditSequence action
 */
export interface msdyn_EditSequenceResponse {
  DefinitionSequenceId: string;
}

/**
 * msdyn_EditSequence action
 *
 * Unbound action
 */
export class msdyn_EditSequenceAction implements Executable<msdyn_EditSequenceResponse> {
  constructor(
    public readonly sequenceId: string,
    public readonly discardChanges: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditSequence`;

    const body: Record<string, unknown> = {
      SequenceId: this.sequenceId,
      DiscardChanges: this.discardChanges,
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

  async parseResponse(response: Response): Promise<msdyn_EditSequenceResponse> {
    const data = await response.json();
    return data as msdyn_EditSequenceResponse;
  }
}
