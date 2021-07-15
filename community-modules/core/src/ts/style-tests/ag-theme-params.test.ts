import * as sass from 'sass';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as child_process from 'child_process';
import '@types/jest';

describe('ag-param', () => {
    it('resolves derived values', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 x: ag-derived(a),
                 a: ag-derived(b, $times: c, $plus: 2),
                 b: 4,
                 c: 10
            ));
            .foo {
                x: ag-param(x);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              x: 42;
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('applies all maths operators', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: 1,
                 b: 2,
                 times-10: ag-derived(a, $times: 10),
                 times-b: ag-derived(a, $times: b),
                 plus-10: ag-derived(a, $plus: 10),
                 plus-b: ag-derived(a, $plus: b),
                 divide-10: ag-derived(a, $divide: 10),
                 divide-b: ag-derived(a, $divide: b),
                 minus-10: ag-derived(a, $minus: 10),
                 minus-b: ag-derived(a, $minus: b)
            ));
            .foo {
                times-10: ag-param(times-10);
                times-b: ag-param(times-b);
                plus-10: ag-param(plus-10);
                plus-b: ag-param(plus-b);
                divide-10: ag-param(divide-10);
                divide-b: ag-param(divide-b);
                minus-10: ag-param(minus-10);
                minus-b: ag-param(minus-b);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              times-10: 10;
              times-b: 2;
              plus-10: 11;
              plus-b: 3;
              divide-10: 0.1;
              divide-b: 0.5;
              minus-10: -9;
              minus-b: -1;
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('applies all color operators', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: rgb(100, 100, 100),
                 b: red,
                 c: rgba(200, 200, 200, 0.5),
                 opacity: ag-derived(a, $opacity: .5),
                 lighten: ag-derived(a, $lighten: 10%),
                 darken: ag-derived(a, $darken: 10%),
                 mix-red: ag-derived(a, $mix: red 25%),
                 mix-b: ag-derived(a, $mix: b 25%),
                 self-overlay-1: ag-derived(c, $self-overlay: 1),
                 self-overlay-2: ag-derived(c, $self-overlay: 2),
                 self-overlay-3: ag-derived(c, $self-overlay: 3)
            ));
            .foo {
                opacity: ag-param(opacity);
                lighten: ag-param(lighten);
                darken: ag-param(darken);
                mix-red: ag-param(mix-red);
                mix-b: ag-param(mix-b);
                self-overlay-1: ag-param(self-overlay-1);
                self-overlay-2: ag-param(self-overlay-2);
                self-overlay-3: ag-param(self-overlay-3);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              opacity: rgba(100, 100, 100, 0.5);
              lighten: #7e7e7e;
              darken: #4b4b4b;
              mix-red: #8b4b4b;
              mix-b: #8b4b4b;
              self-overlay-1: rgba(200, 200, 200, 0.5);
              self-overlay-2: rgba(200, 200, 200, 0.75);
              self-overlay-3: rgba(200, 200, 200, 0.875);
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('does not throw an error when used with a color property in regular use', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 my-color: red
            ));
            .foo {
                x: ag-param(my-color);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              x: red;
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('throws an error when used with a color property and color access is disabled', () => {
        expect(() => {
            renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 my-color: red
            ));
            @include ag-allow-color-param-access-with-ag-param(false);
            .foo {
                x: ag-param(my-color);
            }
        `);
        }).toThrowError("Illegal call to ag-param(my-color) - all colour params must be accessed through the ag-color-property mixin.");
    });
});

describe('ag-color-property', () => {
    it('emits a color property with CSS var override', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: red,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              color: red;
              color: var(--ag-a, red);
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('allows CSS variable overrides to be disabled', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: ag-derived(c),
                 c: red,
                 suppress-css-var-overrides: true
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              color: red;
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('implements ag-derived default value cascades using CSS variable default values', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: ag-derived(c),
                 c: red,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
            ".foo {
              color: red;
              color: var(--ag-a, var(--ag-b, var(--ag-c, red)));
            }"
        `);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('disables the runtime variable cascade when an ag-derived value modifies a color', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: ag-derived(c, $opacity: 0.5),
                 c: red,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: rgba(255, 0, 0, 0.5);
  color: var(--ag-a, var(--ag-b, rgba(255, 0, 0, 0.5)));
}"
`);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('stops the runtime variable cascade when an ag-derived value in the chain modifies a color', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b, $opacity: 0.5),
                 b: red,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: rgba(255, 0, 0, 0.5);
  color: var(--ag-a, rgba(255, 0, 0, 0.5));
}"
`);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('emits a var with no default value when value is null', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: null,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--ag-a);
}"
`);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('emits a variable cascade with no default value when a value resolves to null', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(c),
                 c: null,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--ag-a, var(--ag-c));
}"
`);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('emits a var with no default value when a value resolves to null through an ag-derived that performs color modification', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: ag-derived(c, $opacity: 0.5),
                 c: null,
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--ag-a, var(--ag-b));
}"
`);
        expect(rendered.message).toBe('');
        expect(rendered.isFatalError).toBe(false);
    });

    it('Allows color values to be CSS variables', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: var(--foo),
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--foo);
  color: var(--ag-a, var(--foo));
}"
`);
        expect(rendered.message).toMatchInlineSnapshot(`""`);
        expect(rendered.isFatalError).toBe(false);
    });

    it('Allows color values to resolve to CSS variables if they are not modified', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: var(--foo),
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);
        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--foo);
  color: var(--ag-a, var(--ag-b, var(--foo)));
}"
`);
        expect(rendered.message).toMatchInlineSnapshot(`""`);
        expect(rendered.isFatalError).toBe(false);
    });

    it('warns when attempting to modify a CSS color variable', () => {
        const rendered = renderScss(`
            @import "../../styles/mixins/ag-theme-params";
            @include ag-register-params((
                 a: ag-derived(b),
                 b: ag-derived(c, $opacity: 0.5),
                 c: var(--foo),
                 suppress-css-var-overrides: false
            ));
            .foo {
                @include ag-color-property(color, a);
            }
        `);

        expect(rendered.css).toMatchInlineSnapshot(`
".foo {
  color: var(--ag-a, var(--ag-b));
}"
`);
        expect(rendered.message.split('\n')[0]).toMatchInlineSnapshot(
            `"WARNING: Problem while calculating theme parameter \`b: ag-derived(c, $opacity: 0.5)\`. This rule attempts to modify the color of \`c\` using $opacity, but (c: var(--foo)) is a CSS variable and can't be modified at compile time. Either set \`c\` to a CSS color value (e.g. #ffffff) or provide a value for \`b\` that does not use $opacity"`
        );
        expect(rendered.isFatalError).toBe(false);
    });
});

const renderScss = (scss: string) => {
    const tmpFile = path.join(os.tmpdir(), `ag-theme-params-test-${Math.random()}.scss`);
    fs.writeFileSync(tmpFile, scss);
    try {
        const process = child_process.spawnSync(path.join(__dirname, '../../../node_modules/.bin/sass'), [
            tmpFile,
            '--load-path',
            __dirname,
        ]);
        let message = process.stderr.toString();
        const isFatalError = process.status !== 0;
        if (isFatalError) {
            // If the process exits, error in JSON formatted, but there's prefix / suffix content that needs removing
            const jsonStart = message.indexOf('{');
            const jsonEnd = message.lastIndexOf('}');
            if (jsonStart === -1 || jsonEnd === -1) {
                throw new Error(`Expected JSON output on error, got: ${message}`);
            }
            const json = message.substring(jsonStart, jsonEnd + 1);
            const parsed = JSON.parse(json);
            message = parsed.message;
        } else {
            // If the process exits normally, error is just text. However, strip stack trace info
            // as line numbers will change regularly and break tests
            message = message.replace(/on line \d+(.|\n)*/m, '').trim();
        }
        return {
            css: process.stdout.toString().trim(),
            message,
            isFatalError,
        };
    } finally {
        fs.unlinkSync(tmpFile);
    }
};
