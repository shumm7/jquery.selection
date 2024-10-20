export default {
    input: 'dist/esm/jquery.selection.js',
    output: {
        file: 'dist/esm/jquery.selection.js',
        format: 'iife',
        globals: {
            jquery: 'jQuery'
        }
    },
    external: [
        'jquery'
    ]
};