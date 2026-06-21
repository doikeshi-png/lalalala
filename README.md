# OXWEB Design Preview

Готовый frontend-дизайн личного кабинета OXWEB для просмотра на GitHub Pages.

## Быстрый старт

```bash
cd frontend
npm ci
npm run dev
```

## Production build

```bash
cd frontend
npm ci
npm run build
npm run preview
```

## GitHub Pages

Workflow уже находится в `.github/workflows/deploy.yml`.

После загрузки репозитория на GitHub:

1. Откройте `Settings → Pages`.
2. В `Build and deployment` выберите `Source: GitHub Actions`.
3. Перейдите во вкладку `Actions`.
4. Дождитесь успешной сборки.
5. Откройте опубликованную ссылку Pages.

## Что проверять

Смотрите файл `DESIGN_COVERAGE_CHECKLIST.md` — там по пунктам отмечено, где в дизайне находится каждое решение из аудита.
