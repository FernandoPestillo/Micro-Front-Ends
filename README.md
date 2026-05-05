# Micro Front-Ends com Module Federation

Monorepo inicial com:

- `apps/shell-angular`: Shell/Host em Angular 21.2.11.
- `apps/dashboard-react`: Remote React com TypeScript, expondo `Dashboard`.
- `apps/profile-svelte`: Remote Svelte, expondo `mountUserProfile`.
- `packages/mfe-contracts`: contratos compartilhados de eventos, payloads e tema.

As versões foram checadas no npm em 2026-05-05. A documentação oficial do Angular indica o major 21 como a versão ativa estável, e o registry npm retorna `@angular/core@21.2.11` como `latest`.

## Estrutura

```text
.
├── apps
│   ├── shell-angular
│   │   ├── angular.json
│   │   ├── webpack.config.js
│   │   ├── src/assets/mf.manifest.json
│   │   └── src/app
│   │       ├── auth-token.service.ts
│   │       ├── dashboard-react-bridge.component.ts
│   │       ├── profile-svelte-element-bridge.component.ts
│   │       ├── profile-svelte-bridge.component.ts
│   │       └── remote-types.d.ts
│   ├── dashboard-react
│   │   ├── webpack.config.js
│   │   ├── src/mount-dashboard.tsx
│   │   └── src/Dashboard.tsx
│   └── profile-svelte
│       ├── webpack.config.js
│       ├── src/UserProfileElement.svelte
│       └── src/UserProfile.svelte
└── packages
    └── mfe-contracts
        └── src/index.ts
└── package.json
```

## Portas

- Shell Angular: `http://localhost:4200`
- Dashboard React: `http://localhost:4201/remoteEntry.js`
- Perfil Svelte: `http://localhost:4202/remoteEntry.js`

## Rodando

```bash
npm install
npm start
```

## Comunicação por Custom Events

Os eventos ficam centralizados em `packages/mfe-contracts`. O Shell mantém o token em `AuthTokenService` e publica:

```ts
publishAuthToken('token-shell-...');
```

Os remotes avisam que estão prontos com `mf:remote-ready`; o Shell responde reenviando o token e o tema atual. Isso evita a condição de corrida clássica em que o Host emite contexto antes do Remote registrar listeners.

Eventos usados:

- `mf:auth-token`: Host para remotes.
- `mf:theme-changed`: Host para remotes.
- `mf:remote-ready`: Remotes para Host.
- `mf:user-context-changed`: reservado para contexto de usuario.
- `mf:navigation-requested`: reservado para navegacao cross-MFE.

## Manifesto dinamico

O Shell carrega `apps/shell-angular/src/assets/mf.manifest.json` no bootstrap:

```json
{
  "dashboardReact": {
    "type": "script",
    "remoteEntry": "http://localhost:4201/remoteEntry.js"
  },
  "profileSvelte": {
    "type": "script",
    "remoteEntry": "http://localhost:4202/remoteEntry.js"
  }
}
```

Isso permite trocar endpoints por ambiente sem recompilar o Host. Os bridges usam `loadRemoteModule` com `type: 'manifest'`.

## Pontos arquiteturais

- O Shell declara bibliotecas compartilhadas no `ModuleFederationPlugin` e carrega remotes por manifesto dinamico.
- O React expõe `mountDashboard`, então o Angular não precisa conhecer `ReactDOM`.
- O Svelte é isolado atrás de uma função `mountUserProfile`, exposta pelo remote, para reduzir acoplamento no Host.
- O Svelte também expõe `defineUserProfileElement`, uma alternativa como Web Component em `/perfil-element`.
- Angular, React, React DOM, RxJS, Svelte e `@mfe/mfe-contracts` são configurados como singletons compartilhados quando aplicável.
- Os bridges do Shell exibem fallback visual quando um remote falha.
- O tema claro/escuro é propagado por `mf:theme-changed` e consumido via CSS variables em Angular, React e Svelte.
