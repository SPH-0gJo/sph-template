const gisTypeCd = {
  2010: 'HP본관',
  2011: 'HP공급관',
  2012: 'HP사용자공급관',
  2013: 'HP내관',
  2020: 'MA본관',
  2021: 'MA공급관',
  2022: 'MA사용자공급관',
  2023: 'MA내관',
  2030: 'LP본관',
  2031: 'LP공급관',
  2032: 'LP사용자공급관',
};

const gisPresCd = {
  HP: '고압',
  MA: '중압',
  LP: '저압',
};

const iqtCde = {
  iqt201: '노출상태 실측',
  iqt202: '조사/탐사',
  iqt203: '불탐',
  iqt204: '단순이기',
  iqt205: '기타',
};

const plMtrqltCd = {
  PE: 'PE',
  PM: 'PLP본관',
  SP: 'SP',
};

const converter = {
  gisTypeCd,
  gisPresCd,
  iqtCde,
  plMtrqltCd,
};

type WordDictTypes = typeof gisTypeCd | typeof gisPresCd | typeof iqtCde | typeof plMtrqltCd;

export const columnValue = (convertId: string, key: string | number): string => {
  const convertType: WordDictTypes = converter[convertId as keyof typeof converter];
  const id = String(key) as keyof WordDictTypes;
  const value: string = convertType[id];
  return value || '-';
};
