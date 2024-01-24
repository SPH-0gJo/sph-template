import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'app/components/common-ui';
import { Header } from 'shared/styles/styled/common';
import styled from 'styled-components';

const LandingPage = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 21.25rem 1fr;
  grid-template-rows: 5.625rem 1fr;
  overflow-x: hidden;
  overflow-y: hidden;
  grid-template-areas:
    'aside header'
    'aside content';
`;

const Aside = styled.aside`
  background: var(--dark-surface-level-2);
  grid-area: aside;
  padding: 0 1.875rem 1.4375rem 1.875rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  user-select: none;
`;

const AsideHeader = styled(Link)`
  height: 5.625rem;
  color: var(--dark-text-primary);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 5rem;
    height: 2rem;
    margin-right: 0.77rem;
  }
  span {
    font-size: 1.81038rem;
    font-style: normal;
    font-weight: var(--text-weight-bold);
    line-height: normal;
  }
`;

const Main = styled.main`
  background-color: var(--light-surface-level-2);
  grid-area: content;
  padding: 2.5rem 2.5rem 0 2.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const ContentsHeader = styled.section`
  border-bottom: 1px solid var(--light-text-disabled);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ContentTitle = styled.div`
  padding: 0.625rem 0rem 1.875rem 0rem;
  p:nth-child(1) {
    color: #000;
  }
  p:nth-child(2) {
    color: #4a4a4a;
    text-shadow: 0px 1px 1px rgba(44, 44, 44, 0.02);
  }
`;

const MainContent = styled.div`
  padding-top: 2.5rem;
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const SamplePage = () => {

  return (
    <LandingPage>
      <Header></Header>
      <Aside>
        <AsideHeader to='/'>
          <img src='/assets/images/logo.svg' alt='Geolab Logo' />
          <span>GEOLAB</span>
        </AsideHeader>
      </Aside>

      <Main>
        <ContentsHeader>
          <ContentTitle>
            <h3>Common UI Sample</h3>
            <p className={'body'}>
              Button / Select / InputField
            </p>
          </ContentTitle>
        </ContentsHeader>
        <MainContent>

          <div className="content-box">
          <h4>Button</h4>

            <div className="content-wrap">
              <h6>Default Style</h6>
              <div className="btn-wrap">
                <Button color="primary" variant="contained" size="xs">버튼</Button>
                <Button color="secondary" variant="contained" size="xs">버튼</Button>
                <Button color="info" variant="contained" size="sm">버튼</Button>
                <Button color="success" variant="contained" size="md">버튼</Button>
                <Button color="warning" variant="contained" size="lg">버튼</Button>
                <Button color="error" variant="contained" size="xl">버튼</Button>
                <Button color="dark" variant="contained" size="xl">버튼</Button>
                <Button color="light" variant="contained" size="xl">버튼</Button>
              </div>
            </div>

            <div className="content-wrap">
              <h6>Round Style</h6>
              <div className="btn-wrap">
                <Button color="primary" size="xs" rounded>버튼</Button>
                <Button color="secondary" size="xs" rounded>버튼</Button>
                <Button color="info" size="sm" rounded>버튼</Button>
                <Button color="success" size="md" rounded>버튼</Button>
                <Button color="warning" size="lg" rounded>버튼</Button>
                <Button color="error" size="xl" rounded>버튼</Button>
                <Button color="dark" size="xl" rounded>버튼</Button>
                <Button color="light" size="xl" rounded>버튼</Button>
              </div>
            </div>

              <div className="content-wrap">
                <h6>Outline Style</h6>
                <div className="btn-wrap">
                  <Button color="primary" variant="outlined" size="xs">버튼</Button>
                  <Button color="secondary" variant="outlined" size="xs">버튼</Button>
                  <Button color="info" variant="outlined" size="sm">버튼</Button>
                  <Button color="success" variant="outlined" size="md">버튼</Button>
                  <Button color="warning" variant="outlined" size="lg">버튼</Button>
                  <Button color="error" variant="outlined" size="xl">버튼</Button>
                  <Button color="dark" variant="outlined" size="xl">버튼</Button>
                  <Button color="light" variant="outlined" size="xl">버튼</Button>
                </div>
              </div>

              <div className="content-wrap">

                <h6>Outline-Round Style</h6>
                <div className="btn-wrap">
                  <Button color="primary" variant="outlined" size="xs" rounded>버튼</Button>
                  <Button color="secondary" variant="outlined" size="xs" rounded>버튼</Button>
                  <Button color="info" variant="outlined" size="sm" rounded>버튼</Button>
                  <Button color="success" variant="outlined" size="md" rounded>버튼</Button>
                  <Button color="warning" variant="outlined" size="lg" rounded>버튼</Button>
                  <Button color="error" variant="outlined" size="xl" rounded>버튼</Button>
                  <Button color="dark" variant="outlined" size="xl" rounded>버튼</Button>
                  <Button color="light" variant="outlined" size="xl" rounded>버튼</Button>
                </div>
              </div>

              <div className="content-wrap">
                <h6>Disabled Style</h6>
                <div className="btn-wrap">
                  <Button color="primary" variant="contained" size="xs" disabled>버튼</Button>
                  <Button color="secondary" variant="contained" size="xs" disabled>버튼</Button>
                  <Button color="info" variant="contained" size="sm">버튼</Button>
                  <Button color="success" variant="contained" size="md">버튼</Button>
                  <Button color="warning" variant="contained" size="lg">버튼</Button>
                  <Button color="error" variant="contained" size="xl">버튼</Button>
                  <Button color="dark" variant="contained" size="xl">버튼</Button>
                  <Button color="light" variant="contained" size="xl">버튼</Button>
                </div>
              </div>
          </div>
        </MainContent>
      </Main>
    </LandingPage>
  );
};
