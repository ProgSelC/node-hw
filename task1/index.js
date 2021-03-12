const { stdin, stdout } = process;

stdout.write('input value: ');
stdin.on('data', (input) => {
    const reversedInput = input.reverse().toString().trim();

    stdout.write(`reversed value: ${reversedInput}\n\ninput value: `);
});
