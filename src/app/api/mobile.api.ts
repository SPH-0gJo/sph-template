import axios from 'axios';
import { SvcRequest } from 'shared/constants/types/mobile/openapi';
import { vWorldKey } from 'shared/constants/varibales';

const mobileApi = {
  openApi: async (request: SvcRequest) => {
    const openApiUrl = 'http://apis.data.go.kr/B500001/fcltySvc/getItkFclty';
    let queryParams = `?serviceKey=${encodeURIComponent(request.serviceKey)}`;
    queryParams += `&pageNo=${encodeURIComponent(request.pageNo)}`;
    queryParams += `&numOfRows=${encodeURIComponent(request.numOfRows)}`;
    queryParams += `&viewType=${encodeURIComponent(request.viewType)}`;
    if (request.BSI) {
      queryParams += `&BSI=${encodeURIComponent(request.BSI)}`;
    }
    if (request.SIGUN) {
      queryParams += `&SIGUN=${encodeURIComponent(request.SIGUN)}`;
    }

    const response = await axios.get(openApiUrl + queryParams);
    return response.data;
  },

  vWorldApiRG: async (latitude: number, longitude: number) => {
    const vWorldGeoCodingUrl = `/vWorld/api?service=address&request=getAddress&version=2.0&crs=epsg:4326&point=${longitude},${latitude}&format=json&type=both&zipcode=true&simple=false&key=${vWorldKey}`;
    const { data } = await axios.get(vWorldGeoCodingUrl, {});
    const fullAddr = [
      data.response.result[0].structure['level1'],
      data.response.result[0].structure['level2'].split(' ')[0],
    ];

    return fullAddr;
  },

  vWorldApiG: async (query: string) => {
    const vWorldGeoCodingUrl = `/vWorld/api?service=address&request=getcoord&version=2.0&crs=epsg:4326&address=${query}&refine=true&simple=false&format=json&type=road&key=${vWorldKey}`;
    const { data } = await axios.get(vWorldGeoCodingUrl, {});

    return data;
  },
};

export { mobileApi };
