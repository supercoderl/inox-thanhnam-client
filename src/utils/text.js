export const getFirstLetter = (text) => {
    return text && text.length > 0 ? text[0].toUpperCase() : "U";
}

export const getColorByAlphabet = (alphabet) => {
    const colors = {
        A: '900C3F', À: '900C3F', Á: '900C3F', Ã: '900C3F', Ạ: '900C3F', Ă: '900C3F', Â: '900C3F',
        B: '581845',
        C: '1C1C1C',
        D: '2C3E50', Đ: '2C3E50',
        E: '4A235A', È: '4A235A', É: '4A235A', Ẽ: '4A235A', Ẹ: '4A235A', Ê: '4A235A',
        F: '154360',
        G: '512E5F',
        H: '283747',
        I: '1B2631',
        J: '6E2C00',
        K: '7D3C98',
        L: '5B2C6F',
        M: '4D5656',
        N: '424949',
        O: '7D6608', Ò: '7D6608', Ó: '7D6608', Õ: '7D6608', Ọ: '7D6608', Ô: '7D6608', Ơ: '7D6608',
        P: '7B241C',
        Q: '943126',
        R: '4D5656',
        S: '512E5F',
        T: '1C2833',
        U: '212F3C', Ù: '212F3C', Ú: '212F3C', Ũ: '212F3C', Ụ: '212F3C', Ư: '212F3C',
        V: '6C3483',
        W: '17202A',
        X: '4A235A',
        Y: '7E5109', Ý: '7E5109',
        Z: '512E5F',
    };

    const upperCaseAlphabet = alphabet.toUpperCase();
    return colors[upperCaseAlphabet] || '000000';
}