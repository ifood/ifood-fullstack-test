import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import PanelBody from 'react-bootstrap/lib/PanelBody'
import PanelHeading from 'react-bootstrap/lib/PanelHeading'
import PanelTitle from 'react-bootstrap/lib/PanelTitle'
import FilterForm from './FilterForm'

export default () => {
  return (
    <Panel bsStyle="primary">
      <PanelHeading>
        <PanelTitle>Orders List</PanelTitle>
      </PanelHeading>
      <PanelBody>
        <FilterForm />
      </PanelBody>
    </Panel>
  )
}
