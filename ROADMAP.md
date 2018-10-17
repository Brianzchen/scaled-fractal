# Todo list

- How to style? Current using css-modules but will that scale well? How will we handle theming such as a color palette that will be passed into deeply nested components? Can we use another styling library that isn't coupled directly to react's implementation?

Conclusion is that we should move towards css-in-js solutions. This enables more programatic styles, easier for maintenance. In addition, we can allow for a greater flexibility of style library choice, if a module maintainer wants to use aphrodite over styled-components, they can
