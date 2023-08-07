import React from 'react';
import NavigationBar from './NavigationBar'
import './Layout.scss'
const MainLayout = ({ children } ) => {
    return (
        <>

        <NavigationBar/>
        <div className="true">{children}</div>


        </>
    )
}

export default MainLayout;