import React from 'react'
import { render } from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import game from './stores/GameStore'
import { MineSweeper } from './MineSweeper'
import { Page } from 'components'


render(
  <MobxProvider game={game}>
    <Page>
      <MineSweeper />
    </Page>
  </MobxProvider>,
  document.getElementById('root')
)