import React from 'react';
import styled from 'styled-components';

const PageLayout = styled.div`
    width: 100%;
`

const Layout = ({children}) => {
    return (
        <PageLayout>
            <main>{children}</main>
        </PageLayout>
    );
}

export default Layout;