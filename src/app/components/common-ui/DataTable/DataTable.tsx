import React from 'react';
import { DataTableSearchBar } from 'app/components/common-ui/DataTable/DataTableSearchBar';
import { DataTableTbody } from 'app/components/common-ui/DataTable/DataTableTbody';
import { DataTableThead } from 'app/components/common-ui/DataTable/DataTableThead';
import { DataTableOptions } from 'shared/constants/types/datatable';
import styled from 'styled-components';

const DataTableContents = styled.div`
  padding: 0.9375rem;
  overflow: auto;
  max-height: 17rem;
`;

const Table = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
`;

interface DataTableData {
  options: DataTableOptions;
  rawData?: Array<string | number | undefined>[];
}

interface DataTableProps {
  data: DataTableData;
}

export const DataTable = (props: DataTableProps) => {
  const { options, rawData } = props.data;
  return (
    <>
      <DataTableContents>
        <DataTableSearchBar />
        <div>
          <Table>
            <DataTableThead columns={options.columns} />
            <DataTableTbody data={rawData} />
          </Table>
        </div>
      </DataTableContents>
    </>
  );
};
