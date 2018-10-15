# Todo list

- Figure out how tests should be implemented, single jest impl or every workspace implements their own suite to their requirements?
- How to style? Current using css-modules but will that scale well? How will we handle theming such as a color palette that will be passed into deeply nested components? Can we use another styling library that isn't coupled directly to react's implementation?
- Proper way to set up module, so that the things that matter always use the same version of dependencies, and we don't get peerDep warnings everywhere