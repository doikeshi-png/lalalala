import { useMemo, useState, type ReactNode } from 'react'
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bot,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CirclePlay,
  Download,
  ExternalLink,
  FileText,
  Heart,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  Plus,
  Repeat2,
  Search,
  Settings,
  Shield,
  Trash2,
  Users
} from 'lucide-react'

type Tab =
  | 'dashboard'
  | 'intelligence'
  | 'research'
  | 'opportunities'
  | 'content'
  | 'queue'
  | 'activity'
  | 'accounts'
  | 'settings'
  | 'lab'

type Tone = 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'violet'
type DrawerState = { title: string; body: string; meta: string } | null

type Metric = {
  label: string
  value: string
  helper: string
  trend: string
  tone: Tone
  shape: 'line' | 'bars' | 'dots'
}

type Narrative = {
  title: string
  score: number
  delta: string
  sentiment: string
  voices: string
  tone: Tone
}

type PostSignal = {
  author: string
  topic: string
  score: number
  hook: string
  why: string
  action: string
}

type Opportunity = {
  account: string
  audience: string
  velocity: string
  reason: string
  suggestion: string
  risk: 'Low' | 'Medium' | 'High'
}

type AccountHealth = {
  username: string
  status: 'Healthy' | 'Warning' | 'Paused'
  score: number
  usage: string
  recommendation: string
}

const NAV: Array<{ id: Tab; label: string; sub: string; icon: ReactNode }> = [
  { id: 'dashboard', label: 'Dashboard', sub: 'главная ценность дня', icon: <LayoutDashboard /> },
  { id: 'intelligence', label: 'Intelligence', sub: 'нарративы и голоса', icon: <Brain /> },
  { id: 'research', label: 'Research Scans', sub: 'конструктор сканов', icon: <Search /> },
  { id: 'opportunities', label: 'Opportunities', sub: 'точки входа', icon: <MessageCircle /> },
  { id: 'content', label: 'Content Lab', sub: 'идеи и хуки', icon: <FileText /> },
  { id: 'queue', label: 'Growth Queue', sub: 'ручное подтверждение', icon: <ListChecks /> },
  { id: 'activity', label: 'Activity', sub: 'запуски и отчеты', icon: <Activity /> },
  { id: 'accounts', label: 'Account Health', sub: 'лимиты и риски', icon: <Users /> },
  { id: 'settings', label: 'Guardrails', sub: 'правила и исключения', icon: <Shield /> },
  { id: 'lab', label: 'Intelligence Lab', sub: 'инструменты анализа', icon: <Bot /> }
]

const metrics: Metric[] = [
  { label: 'Attention Pulse', value: '78/100', helper: 'рынок активнее, чем 7 дней назад', trend: '+12', tone: 'accent', shape: 'line' },
  { label: 'Posts Found Today', value: '2 341', helper: 'после фильтров: 346 ценных', trend: '+18%', tone: 'violet', shape: 'bars' },
  { label: 'Reply Targets', value: '146', helper: '38 — высокий приоритет', trend: '+23%', tone: 'success', shape: 'line' },
  { label: 'Active Accounts', value: '7', helper: '6 healthy, 1 warning', trend: '96%', tone: 'warning', shape: 'dots' }
]

const narratives: Narrative[] = [
  { title: 'AI Agents', score: 82, delta: '+24%', sentiment: 'positive', voices: '128 top voices', tone: 'accent' },
  { title: 'Solana Memecoins', score: 76, delta: '+18%', sentiment: 'heated', voices: '94 top voices', tone: 'violet' },
  { title: 'DePIN x AI', score: 66, delta: '+11%', sentiment: 'early', voices: '51 top voices', tone: 'success' },
  { title: 'Airdrops', score: 58, delta: '+9%', sentiment: 'reviving', voices: '73 top voices', tone: 'warning' },
  { title: 'RWA', score: 54, delta: '+7%', sentiment: 'steady', voices: '42 top voices', tone: 'muted' }
]

const posts: PostSignal[] = [
  { author: '@defi_matt', topic: 'DePIN', score: 92, hook: 'Почему DePIN + AI — новый цикл роста', why: 'Сильный хук + понятная карта рынка', action: 'Разобрать' },
  { author: '@onchain_analyst', topic: 'AI Agents', score: 88, hook: 'ТОП-5 AI агентов, которых недооценивают', why: 'Список, конкретика, спорный тезис', action: 'Сохранить' },
  { author: '@solana_daily', topic: 'Solana', score: 86, hook: 'Solana всё ещё недооценена', why: 'Contrarian angle с метриками', action: 'Открыть' },
  { author: '@airdrop_hunter', topic: 'Airdrops', score: 81, hook: '10 аирдропов с высоким потенциалом', why: 'Польза + срочность', action: 'В идеи' }
]

const opportunities: Opportunity[] = [
  { account: '@0xJeff', audience: '128K', velocity: 'Высокая', reason: 'пост набирает реплаи быстрее среднего', suggestion: 'уместный экспертный ответ', risk: 'Low' },
  { account: '@defi_matt', audience: '98K', velocity: 'Высокая', reason: 'тема совпадает с watchlist AI Agents', suggestion: 'добавить данные по DePIN', risk: 'Low' },
  { account: '@onchain_analyst', audience: '76K', velocity: 'Средняя', reason: 'обсуждение еще не перегрето', suggestion: 'короткий контраргумент', risk: 'Medium' },
  { account: '@solana_daily', audience: '43K', velocity: 'Средняя', reason: 'комментарии открыты для дискуссии', suggestion: 'вопрос с цифрой', risk: 'Medium' }
]

const accounts: AccountHealth[] = [
  { username: '@OxResearch', status: 'Healthy', score: 96, usage: '31 / 20 000 posts', recommendation: 'Можно запускать глубокий скан' },
  { username: '@OxAlpha', status: 'Healthy', score: 88, usage: '16 / 100 replies', recommendation: 'Темп действий безопасный' },
  { username: '@OxAlerts', status: 'Healthy', score: 91, usage: '8 scans today', recommendation: 'Сессия актуальна' },
  { username: '@OxInsights', status: 'Warning', score: 72, usage: '78 / 100 replies', recommendation: 'Снизить темп reply до завтра' }
]

const recentRuns = [
  { title: 'Полный скан рынка', meta: 'Сегодня, 10:42', result: '2 341 posts · 146 targets', status: 'Завершён' },
  { title: 'AI Agents — углубленный', meta: 'Сегодня, 08:15', result: '32 top posts · 18 идей', status: 'Завершён' },
  { title: 'Reply targets 24ч', meta: 'Вчера, 18:30', result: '73 actions · 12 approved', status: 'Завершён' },
  { title: 'DePIN narrative watch', meta: 'Вчера, 09:20', result: 'рост +11%', status: 'Завершён' }
]

const scanTemplates = [
  { title: 'Narrative Scan', desc: 'Найти темы, которые набирают скорость', badge: 'attention' },
  { title: 'Competitor Scan', desc: 'Разобрать посты конкурентов и их хуки', badge: 'patterns' },
  { title: 'Reply Opportunities', desc: 'Найти посты для умных комментариев', badge: 'growth' },
  { title: 'Token Watch', desc: 'Отследить упоминания токена и top voices', badge: 'watch' }
]

const contentIdeas = [
  { title: 'Почему AI Agents переходят на Solana', type: 'Образовательный', detail: 'Топ-3 проекта + объяснение нарратива' },
  { title: 'DePIN x AI: следующая волна инфраструктуры', type: 'Аналитика', detail: 'Сравнить два тренда и показать пересечение' },
  { title: '5 недооцененных аирдропов в мае', type: 'Список', detail: 'Быстрая польза, высокий save-rate' },
  { title: 'Что происходит с рынком RWA?', type: 'Мнение', detail: 'Собрать цифры и дать спокойный take' }
]

const labTools = [
  { title: 'Post Analyzer', desc: 'Hook, тема, эмоция, CTA, timing, engagement quality.', status: 'Готово' },
  { title: 'Profile Analyzer', desc: 'Позиционирование аккаунта, сильные форматы и слабые места.', status: 'Next' },
  { title: 'Narrative Tracker', desc: 'Velocity, sentiment, top voices, early signals.', status: 'Beta' },
  { title: 'Competitor Map', desc: 'Кого отслеживать и какие темы у них повторяются.', status: 'Готово' },
  { title: 'Hook Library', desc: 'Лучшие механики хуков по крипто-нишам.', status: 'Готово' },
  { title: 'Reply Finder', desc: 'Посты, где комментарий может дать видимость.', status: 'Готово' }
]

export function App() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const active = useMemo(() => NAV.find((item) => item.id === tab) ?? NAV[0], [tab])
  const openDrawer = (title: string, body: string, meta = 'Detail side panel') => setDrawer({ title, body, meta })

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark"><span>OX</span></div>
          <div>
            <div className="brand-name">OXWEB</div>
            <div className="brand-tag">Crypto X Intelligence</div>
          </div>
        </div>

        <nav className="nav-list" aria-label="OXWEB navigation">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-copy">
                <strong>{item.label}</strong>
                <small>{item.sub}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="command-card">
            <span className="kbd">⌘K</span>
            <div>
              <strong>Быстрые команды</strong>
              <small>Scan token, Analyze profile, Find reply targets</small>
            </div>
          </div>
          <div className="profile-card">
            <Avatar label="OR" />
            <div>
              <strong>OxResearch</strong>
              <small>Premium workspace</small>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>
      </aside>

      <main className="workspace">
        <Topbar active={active.label} onRun={() => setTab('research')} />
        <div className="page-wrap">
          {tab === 'dashboard' && <Dashboard onOpen={openDrawer} />}
          {tab === 'intelligence' && <Intelligence />}
          {tab === 'research' && <ResearchScans />}
          {tab === 'opportunities' && <Opportunities onOpen={openDrawer} />}
          {tab === 'content' && <ContentLab />}
          {tab === 'queue' && <GrowthQueue />}
          {tab === 'activity' && <ActivityPage onOpen={openDrawer} />}
          {tab === 'accounts' && <AccountHealthPage />}
          {tab === 'settings' && <Guardrails />}
          {tab === 'lab' && <IntelligenceLab />}
        </div>
      </main>
      <DetailDrawer drawer={drawer} onClose={() => setDrawer(null)} />
    </div>
  )
}

function Topbar({ active, onRun }: { active: string; onRun: () => void }) {
  return (
    <header className="topbar">
      <div className="workspace-switcher">
        <Avatar label="OX" />
        <span>OxResearch</span>
        <span className="verified">●</span>
      </div>
      <div className="pill-control"><CalendarDays size={16} /> 7 дней</div>
      <div className="search-box"><Search size={17} /> <span>Поиск или команда...</span><kbd>⌘K</kbd></div>
      <div className="top-context">Сейчас: <strong>{active}</strong></div>
      <button className="primary-btn" type="button" onClick={onRun}><CirclePlay size={17} /> Запустить скан</button>
    </header>
  )
}

function Dashboard({ onOpen }: { onOpen: (title: string, body: string, meta?: string) => void }) {
  return (
    <Page title="Dashboard" kicker="PRIVATE CRYPTO INTELLIGENCE" subtitle="Крипто-интеллект X: находите, анализируйте и действуйте быстрее.">
      <div className="dashboard-grid">
        <section className="main-column">
          <div className="metrics-grid">
            {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </div>

          <Section title="1. Горячие нарративы" action="Смотреть карту внимания">
            <div className="narrative-grid">
              {narratives.map((item) => <NarrativeCard key={item.title} item={item} />)}
            </div>
          </Section>

          <div className="two-col">
            <Section title="2. Лучшие посты для изучения" action="Открыть отчет">
              <PostTable onOpen={onOpen} />
            </Section>
            <Section title="3. Куда идти в реплаи сейчас" action="В очередь">
              <OpportunityList compact onOpen={onOpen} />
            </Section>
          </div>

          <Section title="4. Идеи контента на сегодня" action="Сгенерировать еще">
            <div className="idea-grid">
              {contentIdeas.map((idea) => <IdeaCard key={idea.title} idea={idea} />)}
            </div>
          </Section>
        </section>

        <aside className="right-rail">
          <AccountHealthMini />
          <RecentRuns />
          <div className="insight-card gradient-card">
            <div className="section-eyebrow">AI SUMMARY</div>
            <h3>Главная возможность дня</h3>
            <p>AI Agents и DePIN сходятся в один ранний нарратив. Лучший формат: короткий тред с картой проектов и спорным выводом.</p>
            <button className="ghost-btn" type="button">Перенести в Content Lab</button>
          </div>
        </aside>
      </div>
    </Page>
  )
}

function Intelligence() {
  return (
    <Page title="Intelligence" kicker="MARKET ATTENTION" subtitle="Исследование рынка внимания: нарративы, токены, аккаунты, сообщества и конкуренты.">
      <div className="hero-panel">
        <div>
          <div className="section-eyebrow">Attention Map</div>
          <h2>Что сейчас двигает крипто-X</h2>
          <p>Система показывает скорость роста темы, top voices, sentiment и сигналы раннего нарратива.</p>
        </div>
        <div className="pulse-orb"><span>78</span><small>pulse</small></div>
      </div>
      <div className="three-col">
        {narratives.slice(0, 3).map((item) => <NarrativeCard key={item.title} item={item} expanded />)}
      </div>
      <div className="two-col wide-left">
        <Section title="Top voices" action="Добавить в watchlist">
          <DataRows rows={[
            ['@defi_matt', 'DePIN / AI', '92', '+34%', 'лидер обсуждения'],
            ['@0xJeff', 'Memecoins', '88', '+21%', 'быстрые реплаи'],
            ['@token_thesis', 'RWA', '79', '+17%', 'аналитический тон'],
            ['@airdrop_hunter', 'Airdrops', '76', '+11%', 'высокий save-rate']
          ]} heads={['Аккаунт', 'Фокус', 'Score', 'Velocity', 'Почему важен']} />
        </Section>
        <Section title="Watchlist" action="Настроить">
          <div className="stack-list">
            {['AI Agents', '$SOL ecosystem', 'DePIN infrastructure', 'Airdrop farming', 'RWA regulation'].map((item, i) => (
              <div className="watch-row" key={item}><span>{item}</span><Badge tone={i === 0 ? 'success' : i === 4 ? 'warning' : 'accent'}>{i === 0 ? 'alert on' : i === 4 ? 'risk watch' : 'tracking'}</Badge></div>
            ))}
          </div>
        </Section>
      </div>
    </Page>
  )
}

function ResearchScans() {
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  return (
    <Page title="Research Scans" kicker="SCAN BUILDER" subtitle="Создайте исследовательский скан рынка внимания вместо тяжелой технической формы парсинга.">
      <div className="template-grid">
        {scanTemplates.map((tpl, index) => (
          <button className={`template-card ${selectedTemplate === index ? 'selected' : ''}`} type="button" key={tpl.title} onClick={() => setSelectedTemplate(index)}>
            <span className="template-index">0{index + 1}</span>
            <strong>{tpl.title}</strong>
            <small>{tpl.desc}</small>
            <Badge tone="accent">{tpl.badge}</Badge>
          </button>
        ))}
      </div>
      <div className="builder-layout">
        <Section title="Что ищем" action="Save scan preset">
          <div className="form-grid">
            <Field label="Scan type" value="Narrative Scan" />
            <Field label="Поисковый запрос" value="$hype, AI agents, DePIN" />
            <Field label="Период" value="Last 24h" />
            <Field label="Язык / рынок" value="EN + crypto only" />
          </div>
          <div className="divider" />
          <h3 className="mini-title">Какие посты считать ценными</h3>
          <div className="filter-grid">
            {['Engagement velocity', 'Replies 20+', 'Views 10K+', 'Verified optional', 'Exclude noise', 'Author size 5K–250K'].map((item, i) => (
              <ToggleCard key={item} checked={i < 4} label={item} />
            ))}
          </div>
        </Section>
        <aside className="preview-panel">
          <div className="section-eyebrow">RUN PREVIEW</div>
          <h3>Прогноз запуска</h3>
          <div className="preview-metrics">
            <div><strong>≈ 6 мин</strong><span>время</span></div>
            <div><strong>50</strong><span>постов в отчете</span></div>
            <div><strong>146</strong><span>reply targets</span></div>
          </div>
          <p>CSV доступен как экспорт. Основной результат — интерактивный отчет: Summary, Top narratives, Top posts, Reply opportunities и Content ideas.</p>
          <button className="primary-btn full" type="button"><CirclePlay size={17} /> Запустить Research Scan</button>
        </aside>
      </div>
      <ScanReport />
    </Page>
  )
}

function Opportunities({ onOpen }: { onOpen: (title: string, body: string, meta?: string) => void }) {
  return (
    <Page title="Opportunities" kicker="REPLY NOW" subtitle="Список найденных возможностей: куда идти в комментарии, какие посты разбирать и кого добавить в watchlist.">
      <div className="two-col wide-left">
        <Section title="Reply targets с приоритетом" action="Approve selected">
          <OpportunityList onOpen={onOpen} />
        </Section>
        <Section title="Accounts to watch" action="Новый список">
          <div className="stack-list">
            {accounts.map((account) => (
              <div className="account-line" key={account.username}>
                <Avatar label={account.username.slice(1, 3).toUpperCase()} />
                <div><strong>{account.username}</strong><small>{account.recommendation}</small></div>
                <Badge tone={account.status === 'Warning' ? 'warning' : 'success'}>{account.score}%</Badge>
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Section title="Posts to learn from" action="Export brief">
        <PostTable onOpen={onOpen} />
      </Section>
    </Page>
  )
}

function ContentLab() {
  return (
    <Page title="Content Lab" kicker="FROM SIGNAL TO POST" subtitle="Превращайте найденные посты, паттерны и нарративы в идеи, хуки, черновики и треды.">
      <div className="content-board">
        <Section title="Идеи из последнего скана" action="Сгенерировать еще">
          <div className="idea-grid vertical">
            {contentIdeas.map((idea) => <IdeaCard key={idea.title} idea={idea} />)}
          </div>
        </Section>
        <Section title="Hook Library" action="Открыть библиотеку">
          <div className="hook-list">
            {[
              'Почему все смотрят на X, но пропускают Y',
              'Я изучил 100 постов о {narrative}. Вот паттерн',
              'Непопулярное мнение: {token} переоценен не по той причине',
              'Карта рынка {topic}: кого смотреть, кого игнорировать'
            ].map((hook) => <div className="hook-card" key={hook}>{hook}<Heart size={15} /></div>)}
          </div>
        </Section>
        <Section title="Черновик треда" action="Preview X">
          <div className="draft-card">
            <div className="draft-header"><Badge tone="accent">AI Agents</Badge><span>Thread · 7 posts</span></div>
            <h3>AI Agents переходят от хайпа к инфраструктуре. Вот почему DePIN может стать вторым слоем этого нарратива.</h3>
            <p>1/ Рынок снова ищет понятный тезис. На этой неделе быстрее всего растут посты, где AI связан не с “чатботами”, а с реальной инфраструктурой...</p>
            <div className="draft-actions"><button className="soft-btn">Усилить хук</button><button className="soft-btn">Сделать короче</button><button className="primary-btn">Сохранить</button></div>
          </div>
        </Section>
      </div>
    </Page>
  )
}

function GrowthQueue() {
  const items = [
    ['Reply', '@0xJeff', 'Low', 'Отличный ответ', 'approve'],
    ['Reply', '@defi_matt', 'Low', 'Добавить данные по DePIN', 'approve'],
    ['Like', '@airdrop_hunter', 'Low', 'Рекомендованная реакция', 'review'],
    ['Reply', '@onchain_analyst', 'Medium', 'Нужен rewrite: слишком похож на прошлый ответ', 'rewrite']
  ]
  return (
    <Page title="Growth Queue" kicker="USER-REVIEWED WORKFLOW" subtitle="Система находит точки входа, но пользователь подтверждает действие, текст и темп.">
      <div className="queue-top">
        <MetricStrip title="Action budget" value="50/day" helper="новый аккаунт: до 50 reply в день" />
        <MetricStrip title="Smart pacing" value="28.8 мин" helper="пауза между действиями" />
        <MetricStrip title="Risk guard" value="Low" helper="дубликаты и агрессивные CTA выключены" />
      </div>
      <Section title="Очередь действий" action="Approve low-risk">
        <div className="queue-table">
          {items.map((row) => (
            <div className="queue-row" key={row.join('-')}>
              <Badge tone={row[0] === 'Like' ? 'violet' : 'accent'}>{row[0]}</Badge>
              <strong>{row[1]}</strong>
              <Badge tone={row[2] === 'Medium' ? 'warning' : 'success'}>{row[2]} risk</Badge>
              <span>{row[3]}</span>
              <div className="row-actions"><button className="soft-btn">Открыть</button><button className="primary-btn small">Подтвердить</button></div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Guardrails работают" action="Настроить">
        <div className="guardrail-grid">
          <Guardrail title="Manual review gate" desc="Перед отправкой replies пользователь подтверждает текст." />
          <Guardrail title="Duplicate detection" desc="Похожие формулировки отмечаются как Needs rewrite." />
          <Guardrail title="Smart pacing" desc="Темп зависит от здоровья и возраста аккаунта." />
        </div>
      </Section>
    </Page>
  )
}

function ActivityPage({ onOpen }: { onOpen: (title: string, body: string, meta?: string) => void }) {
  return (
    <Page title="Activity" kicker="JOBS & REPORTS" subtitle="История операций: что запущено, что собрано, где ошибка и какой следующий шаг.">
      <div className="two-col wide-left">
        <Section title="Недавние запуски" action="Все запуски">
          <div className="activity-timeline">
            {recentRuns.map((run, i) => (
              <div className="timeline-row" key={run.title}>
                <span className="timeline-dot" />
                <div><strong>{run.title}</strong><small>{run.meta} · {run.result}</small></div>
                <Badge tone="success">{run.status}</Badge>
                <button className="soft-btn" onClick={() => onOpen(run.title, run.result, run.meta)}>Отчет</button>
              </div>
            ))}
            <div className="timeline-row warning-row">
              <span className="timeline-dot warning" />
              <div><strong>Account session review</strong><small>@OxInsights требует проверки сессии перед ночным сканом</small></div>
              <Badge tone="warning">Needs attention</Badge>
              <button className="soft-btn" onClick={() => onOpen('Session review', 'Account needs re-authentication before the next scan.', 'Needs attention')}>Исправить</button>
            </div>
          </div>
        </Section>
        <Section title="Scan report preview" action="Экспорт">
          <ScanReport compact />
        </Section>
      </div>
    </Page>
  )
}

function AccountHealthPage() {
  return (
    <Page title="Account Health" kicker="HEALTH CENTER" subtitle="Технические детали спрятаны. На первом плане — статус, лимиты, рекомендации и риски.">
      <div className="accounts-grid">
        {accounts.map((account) => <AccountCard key={account.username} account={account} />)}
        <button className="add-card" type="button"><Plus size={22} /><strong>Добавить аккаунт</strong><small>cookies/proxy будут в technical details, не на лицевой карточке</small></button>
      </div>
      <Section title="Usage & limits" action="Изменить лимиты">
        <div className="usage-grid">
          <Usage label="Posts" value="31 / 20 000" percent={12} />
          <Usage label="Comments" value="16 / 100" percent={16} />
          <Usage label="Scans" value="8 / day" percent={38} />
          <Usage label="Risk load" value="Low" percent={22} />
        </div>
      </Section>
    </Page>
  )
}

function Guardrails() {
  return (
    <Page title="Guardrails" kicker="RULES & EXCLUSIONS" subtitle="Настройки безопасности и качества: кого исключать, какие темы не трогать и какие действия требуют подтверждения.">
      <div className="settings-grid">
        <Section title="Исключенные аккаунты" action="Сохранить">
          <div className="textarea-mock">@user1\n@competitor_private\nhttps://x.com/user3</div>
          <p className="muted-copy">До 50 аккаунтов. Эти профили исключаются из сканов и взаимодействий.</p>
        </Section>
        <Section title="Reply guardrails" action="Обновить">
          <div className="stack-list">
            {['Запрет повторяющихся ответов', 'Ручное подтверждение коммерческих ссылок', 'Запрет aggressive CTA', 'Предупреждать о medium/high risk'].map((item) => <ToggleCard checked label={item} key={item} />)}
          </div>
        </Section>
        <Section title="Audit log" action="Экспорт">
          <div className="log-card">
            <code>10:42 · Narrative scan completed · 2 341 posts found</code>
            <code>10:47 · 38 reply targets marked high-value</code>
            <code>10:52 · Duplicate reply prevented · @onchain_analyst</code>
          </div>
        </Section>
      </div>
    </Page>
  )
}

function IntelligenceLab() {
  return (
    <Page title="Intelligence Lab" kicker="ANALYTICAL TOOLS" subtitle="Инструменты анализа спарсенных данных, профилей, нарративов и хуков.">
      <div className="lab-grid">
        {labTools.map((tool) => (
          <div className="lab-card" key={tool.title}>
            <div className="lab-icon"><Bot size={20} /></div>
            <div>
              <Badge tone={tool.status === 'Next' ? 'warning' : 'accent'}>{tool.status}</Badge>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </div>
            <ChevronRight size={18} />
          </div>
        ))}
      </div>
      <Section title="Post Analyzer: пример результата" action="Загрузить CSV">
        <div className="analysis-result">
          <div><strong>Hook</strong><span>Сильный: спорный тезис + конкретный рынок</span></div>
          <div><strong>Structure</strong><span>Проблема → карта игроков → вывод → вопрос аудитории</span></div>
          <div><strong>Engagement quality</strong><span>Высокая доля сохранений и длинных комментариев</span></div>
        </div>
      </Section>
    </Page>
  )
}


function DetailDrawer({ drawer, onClose }: { drawer: DrawerState; onClose: () => void }) {
  if (!drawer) return null
  return (
    <div className="drawer-backdrop" role="presentation" onClick={onClose}>
      <aside className="detail-drawer" role="dialog" aria-label="Detail side panel" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-top">
          <div>
            <div className="section-eyebrow">SIDE PANEL DETAILS</div>
            <h2>{drawer.title}</h2>
          </div>
          <button className="soft-btn" type="button" onClick={onClose}>Закрыть</button>
        </div>
        <div className="drawer-meta">{drawer.meta}</div>
        <p>{drawer.body}</p>
        <div className="drawer-actions">
          <button className="primary-btn" type="button">Сохранить в Content Lab</button>
          <button className="ghost-btn" type="button">Добавить в Growth Queue</button>
        </div>
      </aside>
    </div>
  )
}

function Page({ title, kicker, subtitle, children }: { title: string; kicker: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="section-eyebrow">{kicker}</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function Section({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{title}</h2>
        {action && <button className="link-btn" type="button">{action}<ChevronRight size={15} /></button>}
      </div>
      {children}
    </section>
  )
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="metric-card">
      <div className="metric-label"><span>{metric.label}</span><AlertCircle size={14} /></div>
      <div className="metric-main"><strong>{metric.value}</strong><MiniViz shape={metric.shape} tone={metric.tone} /></div>
      <div className="metric-foot"><Badge tone={metric.tone}>▲ {metric.trend}</Badge><span>{metric.helper}</span></div>
    </div>
  )
}

function NarrativeCard({ item, expanded = false }: { item: Narrative; expanded?: boolean }) {
  return (
    <div className={`narrative-card ${expanded ? 'expanded' : ''}`}>
      <div className="narrative-top"><span className={`token-dot ${item.tone}`} /> <strong>{item.title}</strong><Badge tone={item.tone}>{item.delta}</Badge></div>
      <div className="narrative-score"><span>{item.score}</span><MiniViz shape="line" tone={item.tone} /></div>
      <div className="narrative-meta"><small>{item.sentiment}</small><small>{item.voices}</small></div>
    </div>
  )
}

function PostTable({ onOpen }: { onOpen?: (title: string, body: string, meta?: string) => void }) {
  return (
    <div className="signal-table">
      <div className="signal-row head"><span>Автор</span><span>Тема</span><span>Score</span><span>Hook / почему сработало</span><span></span></div>
      {posts.map((post) => (
        <div className="signal-row" key={post.author}>
          <span className="author"><Avatar label={post.author.slice(1, 3).toUpperCase()} /> {post.author}<span className="verified">●</span></span>
          <span><Badge tone="muted">{post.topic}</Badge></span>
          <span><Progress value={post.score} /></span>
          <span><strong>{post.hook}</strong><small>{post.why}</small></span>
          <button className="soft-btn" type="button" onClick={() => onOpen?.(post.hook, post.why, `${post.author} · ${post.topic} · score ${post.score}`)}>{post.action}</button>
        </div>
      ))}
    </div>
  )
}

function OpportunityList({ compact = false, onOpen }: { compact?: boolean; onOpen?: (title: string, body: string, meta?: string) => void }) {
  return (
    <div className={`opportunity-list ${compact ? 'compact' : ''}`}>
      {opportunities.map((op) => (
        <div className="opportunity-row" key={op.account}>
          <div className="op-main"><Avatar label={op.account.slice(1, 3).toUpperCase()} /><div><strong>{op.account}</strong><small>{op.reason}</small></div></div>
          <span>{op.audience}</span>
          <Badge tone={op.velocity === 'Высокая' ? 'success' : 'warning'}>{op.velocity}</Badge>
          <Badge tone={op.risk === 'Low' ? 'success' : 'warning'}>{op.risk}</Badge>
          <button className="soft-btn" type="button" onClick={() => onOpen?.(op.suggestion, op.reason, `${op.account} · ${op.audience} · ${op.velocity} velocity`)}>{op.suggestion}</button>
        </div>
      ))}
    </div>
  )
}

function AccountHealthMini() {
  return (
    <section className="rail-card">
      <div className="panel-head"><h2>Здоровье аккаунтов</h2><AlertCircle size={14} /></div>
      <div className="stack-list">
        {accounts.map((account) => (
          <div className="account-line" key={account.username}>
            <Avatar label={account.username.slice(1, 3).toUpperCase()} />
            <div><strong>{account.username}</strong><small>{account.status === 'Healthy' ? 'Здорово' : 'Внимание'}</small></div>
            <Progress value={account.score} tone={account.status === 'Warning' ? 'warning' : 'success'} />
          </div>
        ))}
      </div>
      <button className="ghost-btn full" type="button">Управление аккаунтами</button>
    </section>
  )
}

function RecentRuns() {
  return (
    <section className="rail-card">
      <div className="panel-head"><h2>Недавние запуски</h2><button className="link-btn">Все</button></div>
      <div className="stack-list">
        {recentRuns.map((run) => (
          <div className="run-row" key={run.title}>
            <div><strong>{run.title}</strong><small>{run.meta}</small></div>
            <Badge tone="success">{run.status}</Badge>
          </div>
        ))}
      </div>
    </section>
  )
}

function ScanReport({ compact = false }: { compact?: boolean }) {
  return (
    <Section title="Report after scan" action="Download CSV">
      <div className={`report-grid ${compact ? 'compact' : ''}`}>
        {['Summary', 'Top narratives', 'Top posts', 'Top authors', 'Reply opportunities', 'Content ideas', 'Export'].map((item, i) => (
          <div className="report-card" key={item}>
            <span className="report-index">0{i + 1}</span>
            <strong>{item}</strong>
            <small>{i === 0 ? 'что это значит и что делать дальше' : i === 6 ? 'CSV как вторичный формат' : 'интерактивные данные и действия'}</small>
          </div>
        ))}
      </div>
    </Section>
  )
}

function AccountCard({ account }: { account: AccountHealth }) {
  return (
    <div className="account-card-full">
      <div className="account-card-top"><Avatar label={account.username.slice(1, 3).toUpperCase()} /><div><h3>{account.username}</h3><Badge tone={account.status === 'Warning' ? 'warning' : 'success'}>{account.status}</Badge></div></div>
      <Progress value={account.score} tone={account.status === 'Warning' ? 'warning' : 'success'} />
      <div className="account-details"><span>{account.usage}</span><span>{account.recommendation}</span></div>
      <div className="technical-row"><span>Technical details</span><Badge tone="muted">proxy/cookies hidden</Badge></div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return <label className="field"><span>{label}</span><div>{value}</div></label>
}

function ToggleCard({ label, checked }: { label: string; checked: boolean }) {
  const [enabled, setEnabled] = useState(checked)
  return (
    <button className="toggle-card" type="button" aria-pressed={enabled} onClick={() => setEnabled((value) => !value)}>
      <span className={`toggle ${enabled ? 'on' : ''}`} />
      <span>{label}</span>
    </button>
  )
}

function Guardrail({ title, desc }: { title: string; desc: string }) {
  return <div className="guardrail-card"><CheckCircle2 size={18} /><div><strong>{title}</strong><small>{desc}</small></div></div>
}

function DataRows({ heads, rows }: { heads: string[]; rows: string[][] }) {
  return (
    <div className="data-table">
      <div className="data-row head">{heads.map((head) => <span key={head}>{head}</span>)}</div>
      {rows.map((row) => <div className="data-row" key={row.join('-')}>{row.map((cell, i) => <span key={`${cell}-${i}`}>{i === 2 ? <Progress value={Number(cell)} /> : cell}</span>)}</div>)}
    </div>
  )
}

function MetricStrip({ title, value, helper }: { title: string; value: string; helper: string }) {
  return <div className="metric-strip"><span>{title}</span><strong>{value}</strong><small>{helper}</small></div>
}

function Usage({ label, value, percent }: { label: string; value: string; percent: number }) {
  return <div className="usage-card"><span>{label}</span><strong>{value}</strong><Progress value={percent} /></div>
}

function IdeaCard({ idea }: { idea: { title: string; type: string; detail: string } }) {
  return <div className="idea-card"><div className="card-star">☆</div><h3>{idea.title}</h3><p>{idea.detail}</p><Badge tone="muted">{idea.type}</Badge></div>
}

function Avatar({ label }: { label: string }) {
  return <span className="avatar">{label}</span>
}

function Badge({ children, tone = 'accent' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function Progress({ value, tone = 'success' }: { value: number; tone?: Tone }) {
  return <span className="progress"><span className={`progress-fill ${tone}`} style={{ width: `${Math.min(100, Math.max(6, value))}%` }} /></span>
}

function MiniViz({ shape, tone }: { shape: 'line' | 'bars' | 'dots'; tone: Tone }) {
  if (shape === 'bars') {
    return <span className={`mini-viz bars ${tone}`}>{Array.from({ length: 12 }).map((_, i) => <i key={i} style={{ height: `${20 + ((i * 13) % 42)}px` }} />)}</span>
  }
  if (shape === 'dots') {
    return <span className={`mini-viz dots ${tone}`}>{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>
  }
  return <span className={`mini-viz line ${tone}`}><svg viewBox="0 0 120 42" aria-hidden="true"><path d="M2 33 C 15 16, 24 38, 36 20 S 57 23, 66 11 S 82 38, 94 17 S 107 14, 118 8" /></svg></span>
}

export default App
