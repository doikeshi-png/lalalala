# OXWEB — чек-лист покрытия аудита в дизайне личного кабинета

Документ нужен для просмотра дизайна: что именно из UX/UI-аудита уже отражено на сайте, в блоках, кнопках, навигации и логике экранов.

## 1. Главная продуктовая идея

| Пункт аудита | Где смотреть в дизайне | Реализация |
|---|---|---|
| Не “парсер”, а Crypto X Intelligence & Growth Ops | `Dashboard`, заголовки, subtitle, top cards | Интерфейс показывает рынок внимания, нарративы, посты, reply opportunities и идеи контента. |
| Главный экран не Accounts | Первый экран `Dashboard` | Пользователь сразу видит ценность дня, а не proxy/cookies. |
| Данные должны превращаться в решения | `Best Posts`, `Reply Targets`, `Content Ideas`, `Scan Report` | Есть не только цифры, но и смысл: hook, why, action, recommended reply, идеи. |

## 2. Новая информационная архитектура

| Раздел из аудита | Пункт меню в дизайне | Что внутри |
|---|---|---|
| Dashboard | `Dashboard` | Attention Pulse, Hot Narratives, Top Posts, Reply Targets, Content Ideas, Account Health, Recent Activity. |
| Intelligence | `Intelligence` | Narrative pulse, tokens, top voices, watchlists, market signals. |
| Research Scans | `Research Scans` | Шаблоны сканов, filters, output options, forecast, saved scans. |
| Opportunities | `Opportunities` | Reply opportunities, posts to learn from, accounts to watch. |
| Content Lab | `Content Lab` | Hooks, draft cards, thread ideas, saved ideas, AI content directions. |
| Growth Queue | `Growth Queue` | Manual review, risk labels, smart pacing, approve/rewrite/skip logic. |
| Activity | `Activity` | Runs, reports, status, errors, next steps. |
| Account Health | `Account Health` | Healthy/Warning/Paused, usage, limits, session, proxy hidden in technical details. |
| Settings / Guardrails | `Guardrails` | Excluded accounts, sensitive topics, duplicate guard, manual approval rules. |
| Tools / Intelligence Lab | `Intelligence Lab` | Post Analyzer, Profile Analyzer, Narrative Tracker, Competitor Map, Hook Library. |

## 3. Dashboard — проверка главного экрана

| Требование аудита | Где реализовано |
|---|---|
| Attention Pulse | Верхняя карточка `Attention Pulse`. |
| Hot Narratives | Блок `Trending Narratives` / `Горячие нарративы`: AI Agents, Solana Memecoins, DePIN x AI, Airdrops, RWA. |
| Best Posts to Learn From | Таблица/карточка `Best Posts to Learn From`: автор, тема, score, hook, why, action. |
| Reply Now / Reply Targets | Блок `Reply Targets` / `Opportunities for replies`: аудитория, velocity, предложение, risk. |
| Content Ideas for You | Блок `Content Ideas for Today`: карточки идей с типом поста. |
| Account Health | Правая/нижняя карточка со статусом аккаунтов, usage bars, warnings. |
| Recent Activity | Виджет последних запусков и статусов. |

## 4. Research Scans вместо старого Parse

| Было | Стало в дизайне |
|---|---|
| Parse | Research Scans / Research Scan Builder |
| Источник | What do you want to find / Scan type |
| Фильтры лайков/реплаев/просмотров | Signal filters: engagement, velocity, author size, verified, language |
| Глубина | Time window: 6h / 24h / 7d / custom |
| CSV как финал | Insight report, post table, reply queue, AI ideas, CSV как вторичный export |
| Ручная форма | Scan templates: Narrative Scan, Competitor Scan, Reply Scan, Token Scan |
| Запуск без понимания | Forecast: время, лимиты, ожидаемый результат, risk flags |

## 5. Growth Queue вместо прямых Actions

| Требование | Где смотреть |
|---|---|
| Не auto-spam, а user-reviewed workflow | Раздел `Growth Queue`. |
| Ручное подтверждение | Кнопки/статусы `Approve`, `Rewrite`, `Skip`, `Needs review`. |
| Risk labels | Badges `Low`, `Medium`, `High`. |
| Smart pacing | Показ темпа, дневного action budget, пауз и рекомендаций. |
| Duplicate guard | Блок guardrails / queue notes. |
| Действие привязано к причине | У каждой возможности есть `reason`, `suggestion`, `expected value`. |

## 6. Account Health вместо технического Accounts

| Требование аудита | Реализация |
|---|---|
| Proxy/cookies не показывать на лицевой карточке | В интерфейсе виден health/status/usage, технические детали спрятаны. |
| Статусы Healthy / Warning / Paused / Needs review | Есть health badges и progress bars. |
| Рекомендации по аккаунту | Есть recommendation / next action. |
| Лимиты — компактно и понятно | Usage cards и health center вместо перегруженного sidebar. |

## 7. Guardrails & trust

| Пункт аудита | Где смотреть |
|---|---|
| Manual review gate | `Growth Queue`, `Guardrails`. |
| Duplicate detection | `Guardrails` / queue protection. |
| Pacing | `Growth Queue`, account usage. |
| Excluded users / blacklist | `Guardrails`: excluded accounts. |
| Sensitive topics / banned behavior | `Guardrails`: excluded keywords, sensitive topics, rules. |
| Audit log | `Activity`, recent runs, job cards. |

## 8. Intelligence Lab вместо Tools

| Инструмент из аудита | Где реализован |
|---|---|
| Post Analyzer | `Intelligence Lab`. |
| Profile Analyzer | `Intelligence Lab`. |
| Narrative Tracker | `Intelligence` и `Intelligence Lab`. |
| Competitor Map | `Intelligence Lab` / `Intelligence`. |
| Hook Library | `Content Lab` / `Intelligence Lab`. |
| Reply Opportunity Finder | `Opportunities` / `Intelligence Lab`. |

## 9. Дизайн-система

| Требование | Реализация |
|---|---|
| Premium dark, not hacker terminal | Графитовый фон, мягкие карточки, синий/фиолетовый акцент. |
| Убрать кислотно-зеленую консоль | Зеленый оставлен только для success/healthy. |
| Основной sans-serif | CSS-переменная `--font`: Inter / Geist / Satoshi / Manrope / system. |
| Mono только для technical data | CSS-переменная `--mono`: IBM Plex Mono / JetBrains Mono. |
| Мягкие границы | Border через `--border` и `--border-soft`. |
| Компоненты | Metric cards, post cards, health badges, saved views, command palette, side panel, empty states, audit log. |

## 10. Кнопки и CTA, которые должны быть видны

- `Запустить скан` / `Run scan` — главный CTA.
- `Смотреть все` — раскрытие списков.
- `Разобрать`, `Сохранить`, `Открыть`, `В идеи` — действия с постами.
- `Approve`, `Rewrite`, `Skip` — ручное подтверждение в Growth Queue.
- `Save scan preset` / `Сохранить сценарий` — сохранение скана.
- `Export CSV` — вторичный экспорт, не главный результат.
- `Manage accounts` / `Управление аккаунтами` — Account Health.
- `View report` / `Открыть отчет` — Activity / Runs.

## 11. Что не является финальной backend-логикой

Этот архив — дизайн-прототип личного кабинета. Часть кнопок может быть визуальной или переключать только mock-секции. Для дизайн-ревью задача — проверить полноту UX/UI-структуры, блоков, сценариев и текстов. Backend-интеграция, реальные данные, авторизация, API и production-логика подключаются следующим этапом.
