# Micro Front-Ends com Module Federation

Monorepo inicial com:

- `apps/shell-angular`: Shell/Host em Angular 21.2.11.
- `apps/dashboard-react`: Remote React com TypeScript, expondo `Dashboard`.
- `apps/profile-svelte`: Remote Svelte, expondo `mountUserProfile`.

As versões foram checadas no npm em 2026-05-05. A documentação oficial do Angular indica o major 21 como a versão ativa estável, e o registry npm retorna `@angular/core@21.2.11` como `latest`.

## Estrutura

```text
.
├── apps
│   ├── shell-angular
│   │   ├── angular.json
│   │   ├── webpack.config.js
│   │   └── src/app
│   │       ├── auth-token.service.ts
│   │       ├── dashboard-react-bridge.component.ts
│   │       ├── profile-svelte-bridge.component.ts
│   │       └── remote-types.d.ts
│   ├── dashboard-react
│   │   ├── webpack.config.js
│   │   └── src/Dashboard.tsx
│   └── profile-svelte
│       ├── webpack.config.js
│       └── src/UserProfile.svelte
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

O Shell mantém o token em `AuthTokenService` e publica:

```ts
window.dispatchEvent(new CustomEvent('mf:auth-token', {
  detail: { token: 'token-shell-...' }
}));
```

Os remotes avisam que estão prontos com `mf:remote-ready`; o Shell responde reenviando o token atual. Isso evita a condição de corrida clássica em que o Host emite o token antes do Remote registrar o listener.

Eventos usados:

- `mf:auth-token`: Host para remotes.
- `mf:remote-ready`: Remotes para Host.

## Pontos arquiteturais

- O Shell declara os remotes no `ModuleFederationPlugin` em `apps/shell-angular/webpack.config.js`.
- O React é renderizado dentro do Angular por `createRoot` em `dashboard-react-bridge.component.ts`.
- O Svelte é isolado atrás de uma função `mountUserProfile`, exposta pelo remote, para reduzir acoplamento no Host.
- Angular, React, React DOM, RxJS e Svelte são configurados como singletons compartilhados quando aplicável.
