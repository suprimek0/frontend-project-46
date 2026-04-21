### Hexlet tests and linter status:
[![Actions Status](https://github.com/suprimek0/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/suprimek0/frontend-project-46/actions)

# Gendiff

Утилита для сравнения двух конфигурационных файлов (JSON) и отображения различий.

## Описание

Программа читает два JSON‑файла, сравнивает их содержимое и выводит различия в удобном формате. Поддерживает несколько форматов вывода.

**Основные возможности:**
* чтение JSON‑файлов из указанных путей;
* сравнение объектов с определением:
  * добавленных ключей (`added`);
  * удалённых ключей (`removed`);
  * изменённых значений (`changed`);
  * неизменных ключей (`unchanged`);
* вывод результатов в разных форматах:
  * `stylish` — красивый формат с символами `+`/`−`;
  * `json` — структурированный JSON с отступами.

## Установка
 1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-username/frontend-project-46.git
2. Перейдите в папку проекта:

    ```bash
    cd frontend-project-46
3. Установите зависимости (если есть):

    ```bash
    npm install

## Использование
Запустите программу с указанием путей к двум JSON-файлам:
    ```bash
    node gendiff.js file1.json file2.json
