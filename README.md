# Pledge-dashboard 
A simple SPA dashboard written in Vue.js & Typescript. Users are allowed to filter projects with some criteria and they will get notified once there are new projects coming in or changes occur in that match.

## Tech stack 🛠
Library | Version | Description
------------ | ------------- | -------------
vue | ^2.6.10 | A basic library for building interface
vue-router |  ^3.1.2 | Handles navigation between pages
vuex | ^3.1.1 | For overall state mangement
Typscript | ^3.4.3 | A superset of JavaScript enables type checking
axios | ^0.19.0 | Handles HTTP requests
@vue/composition-api | ^0.1.0 | Provides composition api from vue 3.0 for vue 2.x
@u3u/vue-hooks | ^2.0.1 | Provides hooks based on composition api for using functional-based components in advance

## Build commands 🔧
```
# Project setup
yarn install
```
```
# Compiles and hot-reloads for development
yarn run serve

# Open up your broswer and visit http://localhost:8080/
```
```
# Compiles and minifies for production
yarn run build
```
```
# Lints and fixes files
yarn run lint
```
```
# Run unit tests
yarn run test:unit
```
## File Structure🗂️

## Implementation Approach 🚀
- [Routing] Use `Vue-router` for handling single page navigation. 
--`/explore/:name/:id?`: Projects are categorized by category. `name` and `id` referred to `category.id` and `categor.name`.
-- API `/projects/filter/recently_added/` with query `category_id={id}&page={page}` is used to fetch projects under a certain category. Pagination is supported with showing an orange "Load more" button.
-- API `/projects/featured/` is used to fetch featured projects. Unfortunately, it doesn't return any projects at this moment. It is expected to have an empty message showing in the screen.

- [Filtering] Projects can be filtered by funded percentage and funding goal.
-- Due to the API limitation, filter process is on client-side.
-- Filter status is stored with Vuex. The reason behind is the filter status needs to shared with multiple components: `ProductView`, `FilterPanel`, and also `NotificationList`. 
-- Filters can be changed on the filter panel. Every change event will trigger an action to update filter states.
-- `ProductView` and `NotificationList` are listening to the change with filter.

- [Notification] 

## Some Thoughts 🧠
- Pledge-dashboard is my first Vue project. As a experimental project, I decided to use `Vue` + `Typescript`, together with `@vue/composition-api` for development. It is a good opportunity for me to familarize the coding style with `Typesciprt` and be prepare of the coming `Vue3.0`. Composition Api (will be availabe in Vue3.0) provides a similar coding style to React hooks. It is very nice for ones with React background like me.

- In the app, I also need to use `Vue-router` & `Vuex`. Both libraries haven't not officially support Composition Api. `@u3u/vue-hooks` provides a number of useful vue hooks of `date`, `window size`, `vue-router` & `vuex(store, state, getters, mutations, and actions)`.

