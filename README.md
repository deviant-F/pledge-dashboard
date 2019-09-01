# Pledge-dashboard 
A simple SPA dashboard written in Vue.js & Typescript. Users are allowed to filter projects with some criteria and they will get notified once there are new projects coming in or changes occur in that match.

## 🛠 Tech stack 
Library | Version | Description
------------ | ------------- | -------------
vue | ^2.6.10 | A basic library for building interface
vue-cli | 3.11.0 | Vue project starter
vue-router |  ^3.1.2 | Handles navigation between pages
vuex | ^3.1.1 | For overall state mangement
Typscript | ^3.4.3 | A superset of JavaScript enables type checking
axios | ^0.19.0 | Handles HTTP requests
@vue/composition-api | ^0.1.0 | Provides composition api from vue 3.0 for vue 2.x
@u3u/vue-hooks | ^2.0.1 | Provides hooks based on composition api for using functional-based components in advance

## 🔧 Build commands 
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
## 🗂️ File Structure
```
├─ public 
├─ src 
│   ├─ asset                  <-- folder for storing static assets like images and font files
│   ├─ components             <-- source code for components
│   │   ├─ CategoryList.vue
│   │   ├─ FilterPanel.vue
│   │   ├─ Header.vue
│   │   └─ ProjectCard.vue
│   │
│   ├─ services             
│   │   ├─ api.ts              <-- define API related functions
│   │   └─ getNotification.ts  <-- A dummy message generator to simulate notifications
│   │
│   ├─ store                   <-- define vuex store & modules
│   │   ├─ modules 
│   │   │   ├─ filters.ts
│   │   │   └─ notifications.ts
│   │   └─ index.js            <-- combine all modules and define the root state
│   │
│   ├─ themes                  <-- for some scss files defining colors, mixins, etc.
│   │   └─ colors.scss
│   │
│   ├─ utils                   <-- some reusable functions / tools / constants 
│   │   ├─ constants.ts        
│   │   ├─ functions.ts
│   │   └─ project.ts
│   │
│   ├─ views                   <-- source code for page/view
│   │   ├─ App.vue
│   │   └─ ProjectView.vue 
│   │
│   ├─ main.ts                 <-- the app
│   ├─ router.ts               <-- define the app routing
│   ├─ shims-tsx-d.ts
│   └─ shims-vue-d.ts
│ 
├─ tests                       <-- folder for tests

```

## 🚀Implementation Approach 

### Routing
- Use `Vue-router` for handling single page navigation. 
  -`/explore/:name/:id?`: Projects are categorized by category. `name` and `id` referred to `category.id` and `categor.name`.
  - API `/projects/filter/recently_added/` with query `category_id={id}&page={page}` is used to fetch projects under a certain category. Pagination is supported with showing an orange "Load more" button.
  - API `/projects/featured/` is used to fetch featured projects. Unfortunately, it doesn't return any projects at this moment. It is expected to have an empty message showing in the screen.

### Filtering
- Projects can be filtered by funded percentage and funding goal.
  - Due to the API limitation, filter process is on client-side.
  - Filter status is stored with Vuex. The reason behind is the filter status needs to shared with multiple components: `ProductView`, `FilterPanel`, and also `NotificationList`. 
  - Filters can be changed on the filter panel. Every change event will trigger an action to update filter states.
  - `ProductView` and `NotificationList` are listening to the change with filter.

### Notification
- Users will be notify based on the filter they set.
 - `Header` component fetches for notification every 3 seconds, by triggering a `fetchNotification` action.
 - Inside `fetchNotification` action, it takes `filters` from the root state and passed to the async function `fetchNotification`.
 - A new message is generated with a dummy generator function, then is filtered based on the selected criterias. 
 - If the message matches, it will be added into the store (`notifications` defined in notification vuex module)
 - `Header` component listens to the changes in notification state. Once there is a new message, it will be added to `notify-list` and display to the user.
 - `notify-list` will only show the latest 10 messages.
 
## 🧠 Some Thoughts
- Pledge-dashboard is my first Vue project. As a experimental project, I decided to use `Vue` + `Typescript`, together with `@vue/composition-api` for development. It is a good opportunity for me to familarize the coding style with `Typesciprt` and be prepare of the coming `Vue3.0`. Composition Api provides a similar coding style to React hooks. It is very nice for ones with React background like me.
-`Vue-router` & `Vuex` also needed in the app. However, both libraries haven't not yet officially support Composition Api. we need to write our own hook for connecting our functional component with vuex and vue-router. With a 3rd party library `@u3u/vue-hooks`, things are more eariler. It provides a number of useful vue hooks of `date`, `window size`, `vue-router` & `vuex(store, state, getters, mutations, and actions)`.
