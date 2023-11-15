import { LookerEmbedSDK } from '@looker/embed-sdk';
import styled from "styled-components";
import { useCallback,useState } from 'react';
import { sdk } from './helper';
import {DashboardFilter} from '@looker/filter-components';
import { ComponentsProvider } from '@looker/components'
export const EmbedContainer = styled.div`
 width: 100%;
 height: 95vh;
 & > iframe {
   width: 100%;
   height: 100%;
 }
`;

function Dashboard() {
    
 const embedCtrRef = useCallback((el) => {
   const hostUrl = "https://googlecloud.looker.com/";
   if (el && hostUrl) {
     el.innerHTML = "";
     LookerEmbedSDK.init(hostUrl);
     LookerEmbedSDK.createDashboardWithId('1471')
       .withNext()
       .appendTo(el)
       .build()
       .connect()
       .catch((error) => {
         console.error("Connection error", error);
       });
   }
 }, []);
 return (
  <>
 <EmbedContainer ref={embedCtrRef}></EmbedContainer>
 </>
 )
};
  export default Dashboard

