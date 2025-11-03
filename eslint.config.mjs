// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        rules: {
            // Equivalent to strict_comparison
            'eqeqeq': 'error',

            // Equivalent to lowercase_keywords
            'keyword-spacing': 'error',

            // Equivalent to no_multiple_statements_per_line
            'max-statements-per-line': ['error', { max: 1 }],

            // Equivalent to no_superfluous_elseif and no_useless_else
            'no-else-return': 'error',
            'no-lonely-if': 'error',

            // Equivalent to concat_space with one spacing
            'space-infix-ops': 'error',

            // Equivalent to visibility_required (prefer explicit access modifiers)
            '@typescript-eslint/explicit-member-accessibility': 'error',

            // Equivalent to modernize_types_casting
            'no-implicit-coercion': 'error',

            // Equivalent to new_with_parentheses: false
            'new-parens': 'off',

            // Equivalent to declare_strict_types
            'strict': ['error', 'global'],
        },
        ignores: [
            'node_modules',
            'dist',
            '.nuxt',
            '.output',
            '.output-client',
            '.output-server',
            '.output-static',
            '.output-server-static',
            '.output-client-static',
        ],
    },
)
