const achievementCriteria = {
    "10_palavras": (user, text) => text?.number_words >= 10,
    "5000_palavras": (user, text) => user?.number_words >= 5000,
    "primeiro_texto": (user, text) => user.texts?.length === 1,
    "10_textos": (user, text) => user.texts?.length >= 10
};

module.exports = achievementCriteria;