### Hexlet tests and linter status:
[![Actions Status](https://github.com/suprimek0/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/suprimek0/frontend-project-46/actions)
[![Node CI](https://github.com/suprimek0/frontend-project-46/actions/workflows/build.yml/badge.svg)](https://github.com/suprimek0/frontend-project-46/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=suprimek0_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=suprimek0_frontend-project-46)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=suprimek0_frontend-project-46&metric=bugs)](https://sonarcloud.io/summary/new_code?id=suprimek0_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=suprimek0_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=suprimek0_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=suprimek0_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=suprimek0_frontend-project-46)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=suprimek0_frontend-project-46&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=suprimek0_frontend-project-46)

# Вычислитель отличий (gendiff)

Консольная утилита для сравнения двух конфигурационных файлов и отображения различий между ними.

## Описание

**Вычислитель отличий** — программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн‑сервисов.

Подобный механизм используется:
* при выводе результатов тестов;
* для автоматического отслеживания изменений в конфигурационных файлах;
* в системах контроля версий;
* при анализе настроек приложений.

## Демонстрация работы

<table border="0" cellpadding="10">
  <tr>
    <td align="center">
      <a href="https://asciinema.org/a/8xdsgUupFbZrTdH1" target="_blank">
        <img src="https://asciinema.org/a/8xdsgUupFbZrTdH1.svg" alt="Сравнение плоских YAML‑файлов" width="350">
      </a>
      <br><strong>Шаг 1. YAML‑файлы</strong>
      <br>Базовое сравнение плоских структур
    </td>
    <td align="center">
      <a href="https://asciinema.org/a/DNPjd8JSOSK8GId9" target="_blank">
        <img src="https://asciinema.org/a/DNPjd8JSOSK8GId9.svg" alt="Рекурсивное сравнение JSON" width="350">
      </a>
      <br><strong>Шаг 2. Вложенные структуры</strong>
      <br>Работа с рекурсивными объектами
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://asciinema.org/a/te4QfjApa9FAOfK5" target="_blank">
        <img src="https://asciinema.org/a/te4QfjApa9FAOfK5.svg" alt="Формат вывода plain" width="350">
      </a>
      <br><strong>Шаг 3. Формат plain</strong>
      <br>Текстовый вывод для логирования
    </td>
    <td align="center">
      <a href="https://asciinema.org/a/nb5rpVmYfN5pL8Yu" target="_blank">
        <img src="https://asciinema.org/a/nb5rpVmYfN5pL8Yu.svg" alt="Формат вывода JSON" width="350">
      </a>
      <br><strong>Шаг 4. Формат JSON</strong>
      <br>Структурированный вывод для интеграции
    </td>
  </tr>
</table>


## Возможности

* Поддержка разных входных форматов: **JSON**, **YAML**.
* Генерация отчёта в нескольких форматах:
  * **plain** — текстовый формат с описанием изменений;
  * **stylish** — древовидное представление с индикаторами (`+`, `-`);
  * **json** — структурированный машиночитаемый вывод.
* Использование популярной библиотеки `commander.js` для построения консольной утилиты.
* Автоматизированное тестирование с помощью фреймворка **Jest**.

## Использование

Основная команда:

```bash
gendiff [options] <filepath1> <filepath2>

### Поддерживаемые опции

* `-f, --format <type>` — формат вывода (`stylish` по умолчанию, `plain`, `json`);
* `-V, --version` — показать версию;
* `-h, --help` — показать справку.

### Примеры использования 

Сравнение JSON‑файлов (формат stylish, по умолчанию)

```bash
gendiff file1.json file2.json

Cравнение YAML‑файлов с указанием формата `plain`**
```bash
gendiff --format plain file1.yml file2.yaml

Сравнение JSON и YAML с выводом в формате `json`**
```bash
gendiff --format json file1.json file1.yaml