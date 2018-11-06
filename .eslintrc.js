module.exports = {
  "extends": ["airbnb", 'plugin:flowtype/recommended'],
  "parser": "babel-eslint",
  "plugins": [
    "react",
    "jest",
    'flowtype',
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  "settings": {
    "import/resolver": "webpack",
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    },
  },
  "rules": {
    "function-paren-newline": ["error", "consistent"],
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-expressions": ["error", { "allowShortCircuit": true, "allowTernary": true }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-for": 0,
    "react/jsx-filename-extension": ["error", { "extensions": [".js"] }],
    "react/destructuring-assignment": 0,
    "import/prefer-default-export": 0,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": 0, // Turn off to allow mono-repo to import without defining common deps in respective package.json
    "import/order": [
      "error",
      {
        "newlines-between": "always-and-inside-groups",
        "groups": [["builtin", "external"], "internal", ["parent", "sibling", "index"]]
      }
    ],
  },
}
