import { MainMenu } from 'shared/constants/types/types';

export const MainMenus: MainMenu[] = [
  {
    id: '001',
    name: '시설물 관리',
    children: [
      {
        name: '배관 시설물 관리',
        summary: '배관, 밸브, Test box, 정압기 시설물 시각화, 데이터 관리 화면',
        link: '/geolab/fm/pm',
        image: '/assets/images/sample_map.png',
      },
      // {
      //   name: '실시간 시설물 모니터링(Web)',
      //   summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
      //   link: '/geolab/fm/pm',
      // },
      // {
      //   name: '실시간 시설물 모니터링(Mobile)',
      //   summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
      //   link: '/geolab/fm/pm',
      // },
    ],
  },
  {
    id: '002',
    name: 'Layer 관리',
    children: [
      // {
      //   name: '관리자 Panel',
      //   summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
      //   link: '/geolab/fm/pm',
      // },
      // {
      //   name: '지도 파일 업로드',
      //   summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
      //   link: '/geolab/fm/pm',
      // },
      {
        name: 'WMS & Vector tile',
        summary: 'WMS getMap & Vector tile 렌더링 비교',
        link: '/geolab/lm/mc',
        image: '/assets/images/img_1.png',
      },
      {
        name: '대용량 Point 데이터 시각화',
        summary: '최대 1억 개 포인트 지도 데이터 렌더링 테스트',
        link: '/geolab/lm/mp',
        image: '/assets/images/img_2.png',
      },
    ],
  },
  {
    id: '003',
    name: '도면조회\u002F공간탐색',
    // children: [
    //   {
    //     name: '공간탐색',
    //     summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
    //     link: '/geolab/fm/pm',
    //   },
    // ],
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
