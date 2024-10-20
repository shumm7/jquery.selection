export default {
    input: 'dist/jquery.selection.js',
    output: {
        file: 'dist/jquery.selection.js',
        format: 'iife',
        globals: {
            jquery: 'jQuery'
        }
    },
    external: [
        'jquery'
    ],
};