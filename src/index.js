import React from 'react'
import { render } from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import game from './stores/GameStore'
import { MineSweeper } from './MineSweeper'
import { Page } from 'components'


render(
  <Page>
    <MobxProvider game={game}>
      <MineSweeper />
    </MobxProvider>
  </Page>,
  document.getElementById('root')
)