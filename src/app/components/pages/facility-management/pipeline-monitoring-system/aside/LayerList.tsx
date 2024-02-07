import React from 'react';
import { useLayerGroupStore } from 'app/stores/layerGroup';
import styled from 'styled-components';

import { LayerItem } from './LayerItem';

const LayerWrapper = styled.div`
	width: 100%;
	height: 100%;
	gap: 1.2rem;
	display: flex;
	flex-direction: column;
	border-radius: 0.625rem;
`;

const LayerHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	color: var(--dark-text-primary);
	font-size: 24px;
	font-weight: 500;
	line-height: 1.66;
	& em {
			cursor: pointer;
	}
`;

const LayerContetnt = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

export const LayerList = () => {
	const { layerIdList } = useLayerGroupStore();

	return (
		<LayerWrapper>
			<LayerHeader>
				<div>레이어 추가</div>
				<em className="icon-plus"></em>
			</LayerHeader>
			<LayerContetnt>
				{layerIdList &&
					layerIdList.map(groupId => {
						return <LayerItem key={`mn_group_layer_${groupId}`} id={groupId} />
					})
				}
			</LayerContetnt>
		</LayerWrapper>
	);
};