// import helper from 'app/api/helper';
import axios from 'axios';
import { GSFPipelineResponse } from 'shared/fixtures/pipeline.data';

// const gsf = {
//   pipeline: (id: string) => `/geolab/api/v1/pipelines/${id}`,
// };
//
// const urls = { gsf };

export const gsfApis = {
  pipeline: (gisType: string) =>
    axios.get<GSFPipelineResponse>(`http://localhost:9000/geolab/api/v1/pipelines/${gisType}`),
};
