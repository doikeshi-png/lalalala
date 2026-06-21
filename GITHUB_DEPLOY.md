# OXWEB — выгрузка дизайна личного кабинета на GitHub Pages

Этот архив подготовлен как **статический дизайн-прототип личного кабинета**. Для просмотра дизайна на GitHub Pages нужен только frontend. Backend, реальные cookies/proxy, секреты и рабочие `.env`-файлы не нужны для дизайн-ревью и не должны публиковаться.

## Что уже прописано

- `frontend/vite.config.ts` — установлен `base: './'`, чтобы сборка корректно открывалась на GitHub Pages и в локальном preview.
- `.github/workflows/deploy.yml` — GitHub Actions workflow для автоматической сборки и публикации `frontend/dist`.
- `.gitignore` — исключает `.env`, node_modules, логи и локальные файлы.
- `DESIGN_COVERAGE_CHECKLIST.md` — чек-лист, где смотреть в дизайне все пункты из аудита.
- `DESIGN_IMPLEMENTATION.md` — краткое описание реализованной дизайн-системы и экранов.

## Вариант 1. Быстрая публикация через GitHub Desktop

1. Создайте новый репозиторий на GitHub, например `oxweb-design-preview`.
2. Распакуйте архив в локальную папку.
3. Откройте папку в GitHub Desktop.
4. Сделайте commit: `OXWEB cabinet design preview`.
5. Нажмите `Publish repository` / `Push origin`.
6. На GitHub откройте репозиторий → `Settings` → `Pages`.
7. В блоке `Build and deployment` выберите `Source: GitHub Actions`.
8. Откройте вкладку `Actions` и дождитесь успешного workflow `Deploy OXWEB design preview to GitHub Pages`.
9. После завершения откройте ссылку Pages в `Settings → Pages` или в последнем workflow run.

## Вариант 2. Публикация через терминал

```bash
cd путь/к/папке/oxweb-design-preview

git init
git add .
git commit -m "OXWEB cabinet design preview"
git branch -M main
git remote add origin https://github.com/USERNAME/oxweb-design-preview.git
git push -u origin main
```

Дальше на GitHub: `Settings → Pages → Source → GitHub Actions`.

## Локально посмотреть перед GitHub

```bash
cd frontend
npm ci
npm run dev
```

Откройте адрес, который покажет Vite, обычно `http://localhost:5173`.

## Проверить production-сборку локально

```bash
cd frontend
npm ci
npm run build
npm run preview
```

Обычно preview откроется на `http://localhost:4173`.

## Что важно для дизайн-ревью

Смотрите не как пустой лендинг, а как личный кабинет после входа. В меню слева должны быть все ключевые разделы:

- Dashboard
- Intelligence
- Research Scans
- Opportunities
- Content Lab
- Growth Queue
- Activity
- Account Health
- Guardrails
- Intelligence Lab

Главный экран — `Dashboard`, потому что по аудиту вход должен начинаться с ценности дня, а не с технической вкладки Accounts.

## Безопасность перед публикацией

Перед выгрузкой на GitHub проверьте, что в репозитории нет:

- реального `.env`;
- реальных cookies;
- реальных proxy;
- токенов;
- ключей API;
- персональных данных аккаунтов.

Для дизайн-прототипа все данные должны быть демонстрационными.
