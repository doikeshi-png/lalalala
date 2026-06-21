# OXWEB cabinet design prototype

Готовый дизайн личного кабинета собран по документу `OXWEB_маркетинговый_UX_UI_аудит.docx` и проекту из архива.

Что реализовано во frontend:

- Новый premium dark стиль: графитовый фон, surface-карточки, синий/фиолетовый акцент, зеленый только для healthy/success.
- Новый личный кабинет вместо hacker-console: Dashboard, Intelligence, Research Scans, Opportunities, Content Lab, Growth Queue, Activity, Account Health, Guardrails, Intelligence Lab.
- Dashboard как главный экран после входа: Attention Pulse, Hot Narratives, Best Posts, Reply Targets, Content Ideas, Account Health, Recent Runs.
- Research Scan Builder вместо старого Parse: шаблоны сканов, фильтры, прогноз запуска, структура scan report.
- Growth Queue вместо прямого auto-actions: ручное подтверждение, risk labels, smart pacing, duplicate guard.
- Account Health Center вместо открытого показа proxy/cookies: статусы, usage, рекомендации, technical details спрятаны.
- Settings переупакован в Guardrails & Exclusions.
- Tools переупакован в Intelligence Lab.

Запуск:

```bash
cd frontend
npm install
npm run dev
```

Сборка:

```bash
cd frontend
npm run build
```
