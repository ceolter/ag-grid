module.exports = {
  "root": true,
  "env": {
      "browser": true,
      "jest": true
  },
  "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "tsconfig.eslint.json"
  },
  "plugins": [
      "eslint-plugin-jsdoc",
      "eslint-plugin-import",
      "eslint-plugin-prefer-arrow",
      "@typescript-eslint",
      "@typescript-eslint/tslint",
      "ie11"
  ],
  "rules": {
      "@typescript-eslint/adjacent-overload-signatures": "error",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "error",
      "@typescript-eslint/dot-notation": "error",
      "@typescript-eslint/explicit-member-accessibility": [
          "off",
          {
              "accessibility": "explicit"
          }
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/indent": "warn",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-parameter-properties": "off",
      "@typescript-eslint/no-shadow": [
          "off",
          {
              "hoist": "all"
          }
      ],
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-function-type": "off",
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": [
          "error",
          {
              "path": "always",
              "types": "prefer-import",
              "lib": "always"
          }
      ],
      "@typescript-eslint/type-annotation-spacing": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/unified-signatures": "error",
      "accessor-pairs": "error",
      "array-bracket-spacing": [
          "error",
          "never"
      ],
      "arrow-body-style": "error",
      "arrow-parens": [
          "off",
          "always"
      ],
      "arrow-spacing": [
          "error",
          {
              "before": true,
              "after": true
          }
      ],
      "block-spacing": [
          "error",
          "always"
      ],
      "brace-style": [
          "error",
          "1tbs",
          {
              "allowSingleLine": true
          }
      ],
      "comma-dangle": "off",
      "comma-spacing": [
          "error",
          {
              "before": false,
              "after": true
          }
      ],
      "comma-style": [
          "error",
          "last"
      ],
      "complexity": "off",
      "computed-property-spacing": [
          "error",
          "never"
      ],
      "constructor-super": "error",
      "curly": "error",
      "dot-location": [
          "error",
          "property"
      ],
      "dot-notation": "error",
      "eol-last": "off",
      "eqeqeq": [
          "off",
          "always"
      ],
      "func-call-spacing": [
          "error",
          "never"
      ],
      "generator-star-spacing": [
          "error",
          {
              "before": true,
              "after": true
          }
      ],
      "guard-for-in": "error",
      "handle-callback-err": [
          "error",
          "^(err|error)$"
      ],
      "id-blacklist": "off",
      "id-match": "off",
      "ie11/no-collection-args": "error",
      "ie11/no-for-in-const": "error",
      "ie11/no-weak-collections": "error",
      "import/order": "off",
      "indent": "off",
      "jsdoc/check-alignment": "off",
      "jsdoc/check-indentation": "off",
      "jsdoc/newline-after-description": "off",
      "key-spacing": [
          "error",
          {
              "beforeColon": false,
              "afterColon": true
          }
      ],
      "keyword-spacing": [
          "error",
          {
              "before": true,
              "after": true
          }
      ],
      "lines-between-class-members": [
          "error",
          "always",
          {
              "exceptAfterSingleLine": true
          }
      ],
      "max-classes-per-file": "off",
      "max-len": "off",
      "new-cap": [
          "error",
          {
              "newIsCap": true,
              "capIsNew": false,
              "properties": true
          }
      ],
      "new-parens": "error",
      "no-array-constructor": "error",
      "no-async-promise-executor": "error",
      "no-bitwise": "off",
      "no-caller": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-console": [
          "error",
          {
              "allow": [
                  "warn",
                  "dir",
                  "time",
                  "timeEnd",
                  "timeLog",
                  "trace",
                  "assert",
                  "clear",
                  "count",
                  "countReset",
                  "group",
                  "groupEnd",
                  "table",
                  "debug",
                  "info",
                  "dirxml",
                  "error",
                  "groupCollapsed",
                  "Console",
                  "profile",
                  "profileEnd",
                  "timeStamp",
                  "context"
              ]
          }
      ],
      "no-const-assign": "error",
      "no-constant-condition": [
          "error",
          {
              "checkLoops": false
          }
      ],
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-empty-character-class": "error",
      "no-empty-pattern": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-boolean-cast": "error",
      "no-fallthrough": "off",
      "no-floating-decimal": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-implied-eval": "error",
      "no-inner-declarations": [
          "error",
          "functions"
      ],
      "no-invalid-regexp": "error",
      "no-invalid-this": "off",
      "no-irregular-whitespace": "error",
      "no-iterator": "error",
      "no-labels": [
          "error",
          {
              "allowLoop": false,
              "allowSwitch": false
          }
      ],
      "no-misleading-character-class": "error",
      "no-mixed-operators": [
          "error",
          {
              "groups": [
                  [
                      "==",
                      "!=",
                      "===",
                      "!==",
                      ">",
                      ">=",
                      "<",
                      "<="
                  ],
                  [
                      "&&",
                      "||"
                  ],
                  [
                      "in",
                      "instanceof"
                  ]
              ],
              "allowSamePrecedence": true
          }
      ],
      "no-mixed-spaces-and-tabs": "error",
      "no-multi-spaces": "error",
      "no-multi-str": "error",
      "no-multiple-empty-lines": "error",
      "no-negated-in-lhs": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-object": "error",
      "no-new-require": "error",
      "no-new-symbol": "error",
      "no-new-wrappers": "error",
      "no-obj-calls": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-path-concat": "error",
      "no-proto": "error",
      "no-regex-spaces": "error",
      "no-return-assign": [
          "error",
          "except-parens"
      ],
      "no-return-await": "error",
      "no-self-assign": [
          "error",
          {
              "props": true
          }
      ],
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-shadow": "off",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-tabs": "error",
      "no-template-curly-in-string": "error",
      "no-this-before-super": "error",
      "no-throw-literal": "error",
      "no-trailing-spaces": "error",
      "no-undef": "error",
      "no-undef-init": "error",
      "no-underscore-dangle": "off",
      "no-unexpected-multiline": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": [
          "error",
          {
              "defaultAssignment": false
          }
      ],
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-use-before-define": "off",
      "no-useless-call": "error",
      "no-useless-catch": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-useless-escape": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-void": "error",
      "no-whitespace-before-property": "error",
      "no-with": "error",
      "object-curly-newline": [
          "error",
          {
              "multiline": true,
              "consistent": true
          }
      ],
      "object-curly-spacing": [
          "error",
          "always"
      ],
      "object-property-newline": [
          "error",
          {
              "allowMultiplePropertiesPerLine": true,
              "allowAllPropertiesOnSameLine": false
          }
      ],
      "object-shorthand": "off",
      "one-var": [
          "error",
          "never"
      ],
      "operator-linebreak": [
          "error",
          "after",
          {
              "overrides": {
                  "?": "before",
                  ":": "before",
                  "|>": "before"
              }
          }
      ],
      "padded-blocks": [
          "error",
          {
              "blocks": "never",
              "switches": "always",
              "classes": "always"
          }
      ],
      "prefer-arrow/prefer-arrow-functions": "off",
      "prefer-const": [
          "error",
          {
              "destructuring": "all"
          }
      ],
      "prefer-promise-reject-errors": "error",
      "quote-props": [
          "error",
          "as-needed"
      ],
      "quotes": "off",
      "radix": "error",
      "rest-spread-spacing": [
          "error",
          "never"
      ],
      "semi": [
          "error",
          "always"
      ],
      "semi-spacing": [
          "error",
          {
              "before": false,
              "after": true
          }
      ],
      "space-before-blocks": [
          "error",
          "always"
      ],
      "space-before-function-paren": [
          "error",
          "never"
      ],
      "space-in-parens": [
          "error",
          "never"
      ],
      "space-infix-ops": "error",
      "space-unary-ops": [
          "error",
          {
              "words": true,
              "nonwords": false
          }
      ],
      "spaced-comment": [
          "error",
          "always",
          {
              "line": {
                  "markers": [
                      "*package",
                      "!",
                      "/",
                      ",",
                      "="
                  ]
              },
              "block": {
                  "balanced": true,
                  "markers": [
                      "*package",
                      "!",
                      ",",
                      ":",
                      "::",
                      "flow-include"
                  ],
                  "exceptions": [
                      "*"
                  ]
              }
          }
      ],
      "symbol-description": "error",
      "template-curly-spacing": [
          "error",
          "never"
      ],
      "template-tag-spacing": [
          "error",
          "never"
      ],
      "unicode-bom": [
          "error",
          "never"
      ],
      "use-isnan": "error",
      "valid-typeof": "off",
      "wrap-iife": [
          "error",
          "any",
          {
              "functionPrototypeMethods": true
          }
      ],
      "yield-star-spacing": [
          "error",
          "both"
      ],
      "yoda": [
          "error",
          "never"
      ],
      "@typescript-eslint/tslint/config": [
          "error",
          {
              "rules": {
                  "whitespace": [
                      true,
                      "check-branch",
                      "check-decl",
                      "check-operator",
                      "check-module",
                      "check-separator",
                      "check-rest-spread",
                      "check-typecast",
                      "check-type-operator",
                      "check-preblock"
                  ]
              }
          }
      ]
  },
  "settings": {
      "polyfills": [
          "Reflect",
          "document.registerElement"
      ]
  }
};
