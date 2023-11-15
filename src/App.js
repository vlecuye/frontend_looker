import { sdk } from './helper'
import { Query, Visualization } from '@looker/visualizations'
import { DataProvider } from '@looker/components-data'
import { ComponentsProvider } from '@looker/components'
import { LookerEmbedSDK } from '@looker/embed-sdk'
import { useState,useCallback,useEffect } from 'react'
import {DashboardFilter} from '@looker/filter-components'
import Dashboard from './dashboard';
function App() {
  const [filters,setFilters] = useState([])
  useEffect(() => {
    sdk.dashboard("1471","dashboard_filters").then(value => {console.log(value.value.dashboard_filters);setFilters(value.value.dashboard_filters)})
   }, []);
  return (
    <>
      <h1>Get started with Looker visualization components</h1>
      <ComponentsProvider>
  {filters.map(filter => {return <DashboardFilter class="filter" key={filter.id} filter={filter}></DashboardFilter>})}
  
        <DataProvider sdk={sdk}>
          <Query dashboard={1471}>
            <Visualization />
          </Query>
        </DataProvider>
      </ComponentsProvider>
      <Dashboard/>
    </>
  )
}

export default App
