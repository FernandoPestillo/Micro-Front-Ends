import { useEffect, useState } from 'react';
import {
  MFE_EVENTS,
  ThemeMode,
  notifyRemoteReady,
  subscribeMfeEvent
} from '@mfe/mfe-contracts';
import './styles.css';

export default function Dashboard() {
  const [token, setToken] = useState('aguardando token do Shell');
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const unsubscribeToken = subscribeMfeEvent(MFE_EVENTS.authToken, ({ token }) => setToken(token));
    const unsubscribeTheme = subscribeMfeEvent(MFE_EVENTS.themeChanged, ({ theme }) => setTheme(theme));

    notifyRemoteReady({ name: 'dashboardReact', framework: 'react' });

    return () => {
      unsubscribeToken();
      unsubscribeTheme();
    };
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

      <div className="token-box">
        <span>Tema recebido</span>
        <code>{theme}</code>
      </div>
    </section>
  );
}
