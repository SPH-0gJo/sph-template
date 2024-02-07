export interface SvcRequest {
  /**
   * 서비스키
   */
  serviceKey : string;
  /**
   * 페이지 번호
   */
  pageNo: string;
  /**
   * 한 페이지 결과 수
   */
  numOfRows: string;
  /**
   * 응답타입
   */
  viewType: string;
  /**
   * 수도사업자 광역시도
   */
  BSI?:string;
  /**
   * 수도사업자 시군
   */
  SIGUN?:string;
}

export interface SvcResponse {
  /**
   * 결과코드
   */
  resultCode: string;
  /**
   * 결과메시지
   */
 resultMsg: string;
  /**
   * 한 페이지 결과 수
   */
  numberOfRows: string;
  /**
   * 페이지 번호
   */
  pageNo: string;
  /**
   * 전체 결과 수
   */
  totalCount: string;
  /**
   * 순번
   */
  RNUM: string;
  /**
   * 수도구분
   */
  WILO_NAM: string;
  /**
   * 수도사업자
   */
  WBIZ_NAM: string;
  /**
   * 취수장명
   */
  FCLT_NAM: string;
  /**
   * 취수장주소
   */
  DTL_ADR?: string;
  /**
   * 대표수계
   */
  WSYS_NM?: string;
  /**
   * 수원 (취수원형태)
   */
  WSRC_NM?: string;
  /**
   * 전화번호
   */
  PHONE_NUM?: string;
  /**
   * 준공일
   */
  COMPL_DAT?: string;
  /**
   * 시설용량 (㎥/일)
   */
  FCLT_VOL?: string;
}














