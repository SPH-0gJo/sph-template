/* eslint-disable camelcase */
import { GeolabMenuItems } from 'shared/constants/types/types';

export const GeolabMenus: GeolabMenuItems[] = [
  {
    id: 1,
    name: '배관시설물 관리',
    is_visible: true,
  },
  {
    id: 2,
    name: '지도 시각화',
    is_visible: true,
  },
  {
    id: 3,
    name: '지도 파일 관리',
    is_visible: true,
  },
  {
    id: 4,
    name: '오픈소스 GIS 테크',
    is_visible: true,
  },
  {
    id: 5,
    is_deleted: false,
    is_visible: true,
    list_order: 1,
    parent_id: 1,
    link: '/geolab/fm/mm',
    name: '가스 시설물 도면 관리',
    summary: '가스 배관, 밸브, 정압기, TB 지도 도면 관리화면 입니다.',
  },
  {
    id: 6,
    is_deleted: false,
    is_visible: false,
    list_order: 2,
    parent_id: 1,
    link: '',
    name: '원격 현장지원 서비스',
    summary: '',
  },
  {
    id: 7,
    is_deleted: false,
    is_visible: true,
    list_order: 3,
    parent_id: 1,
    link: '/geolab/fm/pm',
    name: '가스 시설물 지도 스타일',
    summary: '가스 시설물 지도 스타일 도구 입니다. 지도 속성별 색상, 스타일을 변경해 보세요. ',
    thumbnail: '/assets/images/sample_map.png',
  },
  {
    id: 8,
    is_deleted: false,
    is_visible: true,
    list_order: 1,
    parent_id: 2,
    link: '/geolab/gv/hm',
    name: '2024 서울시 버스정류장 위치 정보',
    summary: '서울시 전체 버스정류장 위치를 히트맵으로 시각화 합니다.',
    thumbnail: '/assets/images/img_4.png',
  },
  {
    id: 9,
    is_deleted: false,
    is_visible: true,
    list_order: 3,
    parent_id: 2,
    link: '/geolab/gv/hl',
    name: 'S 커피점 전국 분포 집계',
    summary: '전국 S 커피점을 헥사곤 셀을 통해 집계값을 시각화 합니다.',
    thumbnail: '/assets/images/img_5.png',
  },
  {
    id: 10,
    is_deleted: false,
    is_visible: true,
    list_order: 4,
    parent_id: 2,
    link: '/geolab/gv/sg',
    name: '2024 서울시 공영주차장 금액 집계',
    summary: '2024 서울시 공영주차장 금액 집계를 시각화 합니다.',
    thumbnail: '/assets/images/img_6.png',
  },
  {
    id: 11,
    is_deleted: false,
    is_visible: true,
    list_order: 4,
    parent_id: 2,
    link: '/geolab/gv/cl',
    name: '2021 미국 COVID-19 확진 사례',
    summary: '2021년 주간 미국 COVID-19 확진 사례를 기간별로 시각화 합니다.',
    thumbnail: '/assets/images/img_7.png',
  },
  {
    id: 12,
    is_deleted: false,
    is_visible: true,
    list_order: 5,
    parent_id: 1,
    link: '/geolab/fm/valve-cluster',
    name: '밸브 지도 클러스터',
    summary: '대량의 밸브 데이터를 클러스터링을 통해 부드러운 시각화를 보여줍니다.',
    thumbnail: '/assets/images/valve-cluster.png',
  },
  {
    id: 13,
    is_deleted: false,
    is_visible: true,
    list_order: 1,
    parent_id: 3,
    link: '/geolab/file/coordinate-system/trans',
    name: '좌표계 변환',
    summary: '여러 지도 파일을 업로드하여 좌표계를 변환합니다.',
  },
  {
    id: 14,
    is_deleted: false,
    is_visible: true,
    list_order: 2,
    parent_id: 3,
    link: '/geolab/file/geojson/upload',
    name: '벡터 타일셋 생성하기',
    summary: 'geojson파일을 업로드 하여 mbtiles 파일을 생성 하고 벡터 타일 서비스를 제공합니다.',
  },
  {
    id: 15,
    is_deleted: false,
    is_visible: true,
    list_order: 1,
    parent_id: 4,
    link: '/geolab/lm/mc',
    name: 'WMS & Vector tile',
    summary: 'WMS getMap & Vector tile 렌더링 비교',
    thumbnail: '/assets/images/img_1.png',
  },
  {
    id: 16,
    is_deleted: false,
    is_visible: true,
    list_order: 2,
    parent_id: 4,
    link: '/geolab/lm/mp',
    name: '대용량 Point 데이터 시각화',
    summary: '최대 1억 개 포인트 지도 데이터 렌더링 테스트',
    thumbnail: '/assets/images/img_2.png',
  },
  {
    id: 17,
    is_deleted: false,
    is_visible: false,
    list_order: 2,
    parent_id: 4,
    link: '/geolab/lm/iw',
    name: 'Vector tile 정보 표출',
    summary: 'Vector tile 정보 표출 Info Window',
    thumbnail: '/assets/images/img_3.png',
  },
  {
    id: 18,
    is_deleted: false,
    is_visible: false,
    list_order: 3,
    parent_id: 4,
    link: '/geolab/layer/uploader',
    name: '대용량 지도 파일 업로더',
    summary: '대용량 지도 파일 resumable 업로드',
  },
  {
    id: 19,
    is_deleted: false,
    is_visible: true,
    list_order: 4,
    parent_id: 4,
    link: '/geolab/foss4g-tech/drawing',
    name: '지도 그리기 도구',
    summary: '폴리곤, 라인, 원 지도 그리기',
  },
];
