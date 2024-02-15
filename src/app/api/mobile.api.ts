import axios from 'axios';
import { SvcRequest } from 'shared/constants/types/mobile/openapi';
import { NaverMapsIdKey, NaverMapsSecretKey } from 'shared/constants/varibales';

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

  naverApiRG: async (latitude: number, longitude: number) => {
    const navereGeoCodingUrl = `/naverApi/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=json&orders=addr`;
    const { data } = await axios.get(navereGeoCodingUrl, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NaverMapsIdKey,
        'X-NCP-APIGW-API-KEY': NaverMapsSecretKey,
      },
    });
    const fullAddr = [data.results[0].region['area1'].name, (data.results[0].region['area2'].name).split(' ')[0]];

    return fullAddr;
  },

  naverApiG: async (query: string, latitude: number, longitude: number) => {
    const navereGeoCodingUrl = `/naverApi/map-geocode/v2/geocode?query=${query}&coordinate=${longitude},${latitude}&output=json&orders=addr`;
    const { data } = await axios.get(navereGeoCodingUrl, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NaverMapsIdKey,
        'X-NCP-APIGW-API-KEY': NaverMapsSecretKey,
      },
    });

    return data;
  },
};

export { mobileApi };
