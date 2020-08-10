const getPositionInAlphabet = (letter) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.indexOf(letter.toLowerCase());
};

const getCharacterColor = (letter) => {
    const alphabetPosition = getPositionInAlphabet(letter);
    const picker = alphabetPosition % 3;
    return picker === 0 ? "orange" : picker === 1 ? "blue" : "purple";
}

export { getCharacterColor };