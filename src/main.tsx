import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.tsx'
import { SocketProvider } from './contexts/SocketContext.tsx'
import { LobbiesProvider } from './contexts/LobbiesContext.tsx'
import { LobbyProvider } from './contexts/LobbyContext.tsx'
import { GameProvider } from './contexts/GameContext.tsx'
import { PlayerProvider } from './contexts/PlayerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GameProvider>
      <PlayerProvider>
        <UserProvider>
          <LobbiesProvider>
            <LobbyProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </LobbyProvider>
          </LobbiesProvider>
        </UserProvider>
      </PlayerProvider>
    </GameProvider>
  </BrowserRouter>
);
