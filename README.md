# scaled-fractal

Fractal based design pattern for large scaled applications with many teams.

## Structure objective

The goal here is to create a structure where we don't have too much dependency coupling that would otherwise stop one of our site's modules to upgrade without also upgrading the rest of the site all in one go.

The mono-repo repo structure, uses yarn achieve this. This allows us to separate our project into separate npm packages thus allowing each module to be independent in it's dependencies while also being in the same repo to allow for quick code enhancements.

The disadvantage of mono-repo packages would be that they will be version agnostic to their sibling packages. Though this is not a concern to our modules since any updates we make to a module in the mono-repo should be applied immediately to the main site.

## Structure outline

Below is a basic representation of the root project structure. src will be it's own package, but what's important to note is that `modules` and `packages` are both roots for mono-repo packages, this will help with splitting our concerns, and we'll get into why that's the case a bit later.

```
www-tab -
         |- app
         |- modules
         |- packages
         |.eslintrc
         |babel.config.js
         |jest.config.js
         |package.json
         |yarn.lock
         |...
```

### Explaining the 3 major directories

### `src`
This will serve as the entry point for the site, where major integration points with the site gets instantiated. Think of it as anything that must be single instance, will live here.

```
src -
     |- App
     |- reducers
     |- services
     |index.js
     |package.json
     |...
```

`Main` - This will be the root react component that will form the tree structure of the dom and cascade into further modules and form the structure of the site.

`reducers` - This directory will house our list of reducers, and their initial states. When building our reducers, we will aim to have many, and each of them with a clean cut purpose.
Though the service is not nested inside the store, the intention is that as mentioned above, the store will be initiated with the service as a thunk param. This would mean that to make service requests, a module would have to go through an action creator. This has two benefits, first is that it defines a clear and single way to request or send data to the backend, and second, consistently accessing the service through an action creator would mean that the module itself would not need knowledge of all the service params to pass through, it would pass what it can, and then the thunk can provide the rest from the single store instance. This also has the added benefit that an api can evolve, and if the component calling the action does not have all the necessary params, the thunk can easily define a default value for it.

`services` - This will be where all the site's server requests will live, keeping all server requests in one location is good because in the future, it will be to easy troubleshoot, as well as if there is ever a time when our service requires instantiation like requiring an api key or something similar we have the infrastructure to support it.

`index.js` - Finally this will be the entry point for the react rendering as well as everything else for our mono-repo project. At this point the code would make the initial render, and initialise everything mentioned above.

### `modules`
This is where all the parts of the ui are located.

```
modules -
         |- MenuBar
         |- Body
         |- Footer
         |- Header
         |- SearchBar
         |- ...
```

In the `src`'s `App` component it will create an initial structure that will render one or more of the modules, which then would cascade into other modules. Such as the SearchBar living inside the Header. The Body may consist of MenuBar and the Footer, and later, if we receive a requirement that the same SearchBar needs to be inside the MenuBar, the MenuBar can import the SearchBar module and render it where ever it pleases.

Logic or state of a module can be shared through dispatching redux actions that can be used to either store data for other parts of the application to access or, to alert other modules of something occurring. Though it's important to note that usage of redux actions/store doesn't have to only be used when communicating with other modules, but can be used to reduce overhead logic of the current module or store some state for future regeneration.

When a module wants to render a child module, we want to make sure that we keep a consistent means of passing through data. Because we rely on the redux store being passed through the react tree, though the maintainers of each module are free to use whatever view library they choose, we must make sure we maintain a standard interface of initially rendering a react component that accepts the store and renders a react child as a new module, passing through the store we accepted from our parent.

An additional standard we must maintain is that a parent module cannot under any circumstance, pass props from one module to another. The reasoning for this is that modules should have the capability to be reused anywhere in the site. For example, a Deposit component that connects to the store to retrieve credit card information should be able to render anywhere in the site and still maintain it's functionality. In this way, the module is truly decoupled, and the maintainers of Deposit and it's parent can be maintained by two different teams, yet still be fully autonomous, the parent module is responsible for where the Deposit would render, whereas the functionality of it, is handled by the Deposit itself. 

If you were to break the react chain, because you wanted to render vue for example, then you may have to write code like the following:

```js
// ModuleA/index.js
import React from 'react';
import someVueCode from './someVueCode';

const ModuleA = (props, { store }) => (
  <div>
    {someVueCode(store)}
  </div>
)

export default ModuleA

// ModuleA/someVueCode.js
import Vue from 'vue';
import ModuleB from '@tabdigital/ModuleB';

export default store => (
  const Component = // some kind of vue logic;

  return (
    Component({
      child: (
        <Provider
          store={store}
        >
          <ModuleB />
        </Provider>
    })
  );
)
```

As you can see we utilise the context to grab a reference to the store, this is an important point, as we should be quite confident in using react and even more confident in react and all it's advanced functionality if we want to start rendering with a different engine. Doing something like this should be a last resort when we want to move to a new framework, but it's at least nice to know we have that option.

As you can see from above, it is highly encouraged that you do whatever you please, code how ever you like with whatever code standards you like, within the context of your module.
State management is up to what your team prefers, you don't need to always make use of the redux store. Maintaining a modules internal store has a few benefits where you don't bleed data globally when only your module cares about it, and the module can be cleaned up easily if the feature is no longer required. Feel free to use setState, context, unstated, or whatever else you think fits the needs of the module.

In relation to code standards within a module, feel free to override the top level .eslintrc. Don't use semi colons, use double quotes to declare strings, whatever you like think is best.
By doing this, code standards don't belong to the company, but belong to the team maintaining the module. Though we must be careful to enforce a common code standard if changes occur to the reusable packages, such as `src` or `@site/events`.

---

The rules of when a piece of the application should be split into another module are not hard and fast, it really depends. When a part of an app can really live on it's own and doesn't require logic from the parent, perhaps you should split it, maybe when one part is becoming too complicated and extending that part might require a rewrite in the future, it may be a good indication to split it so that when the rewrite occurs, it won't be breaking the rest of the site.
Though on the other end of the spectrum, don't feel the need to create as many modules as possible just for the sake of it, do it case by case, whenever it seems reasonable to do so.

### `packages`
A clear example of this would be events, or action creators. These are not instanced but they are keys that help to deliver a message to the store. These will need to be imported and used by other modules, having them in a separate package all together is the clear solution. But we want to ensure that we do not version actions, they should always behave the same regardless of who dispatches the action and must remain consistent to the store.

`events`: In here, we expect to have directories that will match with the slices of the store, but instead of reducers and state, we will see actions and constants

```
packages -
          |-events -
                    | - app -
                              |actions.js
                              |constants.js
                    | - posts -
                              |actions.js
                              |constants.js
                    | - search -
                              |actions.js
                              |constants.js
                    | - user -
                              |actions.js
                              |constants.js
```

## Dependency management
When developing a scaled application with many independent pieces we must be conscious and ensure that all packages are using the same version of major dependencies.

To accomplish this, notice how the `@site/menu` module in, `modules/Menu` does not have any dependencies, yet the embedded JavaScript files are freely importing dependencies such as `react` and `react-redux`. This is accomplished by the way yarn workspaces works. All dependencies are consolidated into a single `node_modules` and therefore any package in the project can import it. This is especially important with packages such as `react`, where all components in the react tree must use the same version, as well as helping to maintain a stable bundle that doesn't unintentionally duplicate packages.

Though we want unified packages across the project, a child package doesn't necessarily have to be locked to the same version as the main `src` package. If you note `@site/header` and `@site/main`, these two packages use `lodash`, different versions, as well as the main `src` package not depending on lodash at all. Giving child packages the flexibility to choose their own dependency for non-critical dependencies enables packages to upgrade incrementally, which avoids many teams coordinating big bang commits often.

## Style library
The choice of a styling libraries has a few considerations. First it must scale, what this means is that, I should be able to define a set of brand attributes such as color in one location and have that cascade easily through the site.

Because of this consideration, JavaScript defined css seems like the most appropriate solution. It's the current trend as of writing this, and for good reason. It allows for more programmatic styles as well being able to be defined as a simple JavaScript object that can be passed through a site.

For the sake of this project I have opted for `aphrodite` as that is my styling library of choice.
This is my preference as it mimics the simple api of standard inline styles which gives it a simple learning curve, while being injected as `<style />` blocks to be performant as well as exposing powerful css functionality that usually isn't possible with JavaScript defined css such as :hover/animations/etc.
Though you could replace it with whatever you prefer.

## Tutorial

To add a workspace dependency, run the following in the root dir

```
yarn workspace [workspace] add [packageName]@1.0.0
```
