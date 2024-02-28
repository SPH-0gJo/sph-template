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
        thumbnail: '/assets/images/sample_map.png',
      },
      {
        name: '시설물 지도(도면)관리 서비스',
        summary: '배관, 밸브, Test box, 정압기 속성 데이터 수정 화면',
        link: '/geolab/fm/mm',
      },
      {
        name: '실시간 시설물 모니터링',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/fm/rpm',
      },
    ],
  },
  {
    id: '002',
    name: 'Layer 관리',
    children: [
      {
        name: '지도 파일 업로드',
        summary: '도로명 / 건물 / 좌표 등의 기준을 활용해 장소를 검색해 보세요',
        link: '/geolab/layer/uploader',
      },
      {
        name: 'WMS & Vector tile',
        summary: 'WMS getMap & Vector tile 렌더링 비교',
        link: '/geolab/lm/mc',
        thumbnail: '/assets/images/img_1.png',
      },
      {
        name: '대용량 Point 데이터 시각화',
        summary: '최대 1억 개 포인트 지도 데이터 렌더링 테스트',
        link: '/geolab/lm/mp',
        thumbnail: '/assets/images/img_2.png',
      },
      {
        name: 'Vector tile 정보 표출',
        summary: 'Vector tile 정보 표출 Info Window',
        link: '/geolab/lm/iw',
        thumbnail: '/assets/images/img_3.png',
      },
    ],
  },
  {
    id: '003',
    name: '도면조회\u002F공간탐색',
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
    children: [
      {
        name: 'Heat map',
        summary: '2024 서울시 버스정류장 위치 정보',
        link: '/geolab/gv/hm',
        thumbnail: '/assets/images/img_4.png',
      },
      {
        name: 'Hexagon Layer',
        summary: '2024 스타벅스 한국 매장 데이터 집계',
        link: '/geolab/gv/hl',
        thumbnail: '/assets/images/img_5.png',
      },
      {
        name: 'Screen Grid map',
        summary: '2024 서울시 공영주차장 금액 집계',
        link: '/geolab/gv/sg',
        thumbnail: '/assets/images/img_6.png',
      },
      {
        name: 'Contour Layer',
        summary: '2021 미국 COVID-19 확진 사례',
        link: '/geolab/gv/cl',
        thumbnail: '/assets/images/img_7.png',
      },
    ],
  },
  {
    id: '007',
    name: 'GIS 데이터 분석',
  },
  {
    id: '008',
    name: '대시보드',
  },
  {
    id: '009',
    name: '디자인 가이드',
    children: [
      {
        name: '공통 컴포넌트 모음',
        summary: 'Geolab 개발자 공통 컴포넌트 및 디자인 가이드',
        link: '/geolab/guide',
      },
    ],
  },
  {
    id: '010',
    name: '지도 파일 관리',
    children: [
      {
        name: '좌표계 변환',
        summary: 'geojosn파일 좌표계 변환',
        link: '/geolab/file/coordinate-system/trans',
      },
      {
        name: '지도 파일 업로드',
        summary: 'geojosn파일 업로드 및 Mbtiles 베이킹',
        link: '/geolab/file/geojson/upload',
      },
    ],
  },
  {
    id: '011',
    name: '모바일 현장 지원 시스템',
    children: [
      {
        name: '모바일 현장 지원 시스템',
        summary: '모바일 현장지원 시스템',
        link: '/geolab/m/mm',
      },
    ],
  },
];
