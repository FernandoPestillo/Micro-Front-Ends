import { useEffect, useState } from 'react';
import { AUTH_TOKEN_EVENT, AuthTokenPayload, notifyRemoteReady } from './federation-events';
import './styles.css';

export default function Dashboard() {
  const [token, setToken] = useState('aguardando token do Shell');

  useEffect(() => {
    const handleToken = (event: Event) => {
      const customEvent = event as CustomEvent<AuthTokenPayload>;
      setToken(customEvent.detail.token);
    };

    window.addEventListener(AUTH_TOKEN_EVENT, handleToken);
    notifyRemoteReady('dashboardReact');

    return () => window.removeEventListener(AUTH_TOKEN_EVENT, handleToken);
  }, []);

  return (
    <section className="dashboard">
      <div>
        <p className="eyebrow">Micro App A · React</p>
        <h1>Dashboard</h1>
        <p className="summary">Indicadores operacionais renderizados como remote federado.</p>
      </div>

      <div className="metrics">
        <article>
          <span>Receita</span>
          <strong>R$ 248k</strong>
        </article>
        <article>
          <span>Conversão</span>
          <strong>7,8%</strong>
        </article>
        <article>
          <span>NPS</span>
          <strong>74</strong>
        </article>
      </div>

      <div className="token-box">
        <span>Token recebido</span>
        <code>{token}</code>
      </div>
    </section>
  );
}
