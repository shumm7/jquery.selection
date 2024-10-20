import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input: 'dist/cjs/jquery.selection.js',
    output: {
        file: 'dist/cjs/jquery.selection.js',
        format: 'iife',
        sourcemaps: true,
        globals: {
            jquery: 'jQuery'
        }
    },
    external: [
        'jquery'
    ],
    plugins: [
        sourcemaps()
      ]
};