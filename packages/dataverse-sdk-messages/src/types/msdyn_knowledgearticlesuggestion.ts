/**
 * msdyn_knowledgearticlesuggestion entity type
 */
export interface msdyn_knowledgearticlesuggestion {
  _msdyn_suggestedentity_value: string;
  msdyn_confidencescore: number;
  msdyn_knowledgearticlesuggestionid: string;
  msdyn_suggestionforentitylogicalname: string;
  msdyn_suggestionforid: string;
  msdyn_additionalcontext: string;
  msdyn_keyphrases: string;
  msdyn_rank: number;
  msdyn_name: string;
}
