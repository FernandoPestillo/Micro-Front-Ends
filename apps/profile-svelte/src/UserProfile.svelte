<script lang="ts">
  import { onMount } from 'svelte';
  import {
    MFE_EVENTS,
    notifyRemoteReady,
    subscribeMfeEvent,
    type ThemeMode
  } from '@mfe/mfe-contracts';

  let token = 'aguardando token do Shell';
  let theme: ThemeMode = 'light';

  onMount(() => {
    const unsubscribeToken = subscribeMfeEvent(MFE_EVENTS.authToken, (payload) => {
      token = payload.token;
    });

    const unsubscribeTheme = subscribeMfeEvent(MFE_EVENTS.themeChanged, (payload) => {
      theme = payload.theme;
    });

    notifyRemoteReady({ name: 'profileSvelte', framework: 'svelte' });

    return () => {
      unsubscribeToken();
      unsubscribeTheme();
    };
  });
</script>

<section class="profile">
  <div>
    <p class="eyebrow">Micro App B · Svelte</p>
    <h1>Perfil do Usuário</h1>
    <p class="summary">Resumo de identidade renderizado como remote federado.</p>
  </div>

  <div class="person">
    <div class="avatar" aria-hidden="true">FP</div>
    <div>
      <strong>Fernando Pestillo</strong>
      <span>Arquiteto de Software</span>
    </div>
  </div>

  <div class="details">
    <div>
      <span>Plano</span>
      <strong>Enterprise</strong>
    </div>
    <div>
      <span>Status</span>
      <strong>Ativo</strong>
    </div>
  </div>

  <div class="token-box">
    <span>Token recebido</span>
    <code>{token}</code>
  </div>

  <div class="token-box">
    <span>Tema recebido</span>
    <code>{theme}</code>
  </div>
</section>

<style>
  .profile {
    background: var(--mfe-surface, #ffffff);
    border: 1px solid var(--mfe-border, #d9e1e8);
    border-radius: 8px;
    color: var(--mfe-text, #1d252c);
    display: grid;
    gap: 24px;
    padding: 24px;
  }

  .eyebrow {
    color: var(--mfe-accent, #7c4a03);
    font-size: 13px;
    font-weight: 700;
    margin: 0 0 8px;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
  }

  .summary {
    color: var(--mfe-muted, #55616d);
    margin: 8px 0 0;
  }

  .person {
    align-items: center;
    display: flex;
    gap: 16px;
  }

  .avatar {
    align-items: center;
    background: var(--mfe-accent, #f4c95d);
    border-radius: 50%;
    color: #2c2412;
    display: flex;
    font-weight: 800;
    height: 64px;
    justify-content: center;
    width: 64px;
  }

  .person strong,
  .person span {
    display: block;
  }

  .person span,
  .details span,
  .token-box span {
    color: var(--mfe-muted, #55616d);
  }

  .details {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .details div,
  .token-box {
    background: var(--mfe-surface-alt, #f7f8fa);
    border: 1px solid var(--mfe-border, #d9e1e8);
    border-radius: 8px;
    padding: 16px;
  }

  .details span,
  .token-box span {
    display: block;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .token-box code {
    display: block;
    overflow-wrap: anywhere;
  }

  @media (max-width: 720px) {
    .details {
      grid-template-columns: 1fr;
    }
  }
</style>
