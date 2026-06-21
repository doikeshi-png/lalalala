# OXWEB — выгрузка через GitHub Actions

Этот архив сделан для просмотра дизайна личного кабинета OXWEB через GitHub Pages + GitHub Actions.

## Как загрузить

1. В репозитории удали старые файлы, которые были загружены плоско: `index.html`, `index-*.js`, `index-*.css`, `README_UPLOAD.md`, `download`.
2. Распакуй этот ZIP.
3. Загрузи в GitHub всю структуру как есть, не перетаскивая файлы из папок в корень.

Правильная структура:

```text
.github/
  workflows/
    deploy.yml
frontend/
  src/
    App.tsx
    main.tsx
    styles.css
  index.html
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
DESIGN_COVERAGE_CHECKLIST.md
DESIGN_IMPLEMENTATION.md
GITHUB_ACTIONS_UPLOAD.md
README.md
```

## Настройка GitHub Pages

1. Открой `Settings → Pages`.
2. В блоке `Build and deployment` выбери `Source: GitHub Actions`.
3. Сохрани.
4. Открой вкладку `Actions`.
5. Запусти workflow `Deploy OXWEB design preview to GitHub Pages`, если он не стартовал автоматически.

После успешного деплоя дизайн будет доступен по ссылке Pages, например:

```text
https://doikeshi-png.github.io/X/
```

## Что исправлено в этой версии

- Убраны причины съезда кнопок в таблицах и карточках.
- Добавлены стабильные сетки для `Reply opportunities`, `Growth Queue`, `Top posts`, `right rail`.
- Верхняя панель стала устойчивой к разной ширине экрана.
- Кнопки и бейджи больше не выталкивают соседние колонки.
- Добавлены интерактивные клики: навигация по разделам, выбор шаблона скана, переключатели guardrails/filters, CTA `Запустить скан` переводит на Research Scans.
- Сборка идет через GitHub Actions, поэтому сохраняется корректная структура ассетов и анимаций.

## Где смотреть соответствие аудиту

Открой файл `DESIGN_COVERAGE_CHECKLIST.md`: там указано, где в интерфейсе находится каждый пункт из аудита.
