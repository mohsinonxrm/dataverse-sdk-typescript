import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ExtractTextEntities action
 */
export interface ExtractTextEntitiesResponse {
  originalText: string;
  textScore: number;
}

/**
 * ExtractTextEntities action
 *
 * Unbound action
 */
export class ExtractTextEntitiesAction implements Executable<ExtractTextEntitiesResponse> {
  constructor(
    public readonly text: string,
    public readonly modelId: string,
    public readonly language: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ExtractTextEntities`;

    const body: Record<string, unknown> = {
      text: this.text,
      modelId: this.modelId,
      language: this.language,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<ExtractTextEntitiesResponse> {
    const data = await response.json();
    return data as ExtractTextEntitiesResponse;
  }
}
