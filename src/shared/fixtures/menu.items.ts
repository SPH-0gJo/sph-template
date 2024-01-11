import { MainMenu } from 'shared/constants/types';

export const MainMenus: MainMenu[] = [
  {
    id: '001',
    name: '시설물 관리',
    children: [
      {
        name: '배관 시설물 관리',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
      {
        name: '실시간 시설물 모니터링(Web)',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
      {
        name: '실시간 시설물 모니터링(Mobile)',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
    ],
  },
  {
    id: '002',
    name: 'Layer 관리',
    children: [
      {
        name: '관리자 Panel',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
      {
        name: '지도 파일 업로드',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
      {
        name: 'WMS & Vector tile',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/lm/mc',
      },
    ],
  },
  {
    id: '003',
    name: '도면조회\u002F공간탐색',
    children: [
      {
        name: '공간탐색',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/pm',
      },
    ],
  },
  {
    id: '004',
    name: '차량관제',
  },
  {
    id: '005',
    name: '상황분석',
  },
  {
    id: '006',
    name: 'GIS 시각화',
  },
  {
    id: '007',
    name: 'GIS 데이터 분석',
  },
  {
    id: '008',
    name: '대시보드',
  },
];